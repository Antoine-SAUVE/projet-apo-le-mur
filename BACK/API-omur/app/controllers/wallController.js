const User = require('../models/user');
const Wall = require('../models/wall');
// We require fs-extra to remove files in public folder
const fs = require('fs-extra');
 

const wallController = {
    // Get walls with user informations
    listWalls: async function (req, res){
      const userId = req.userId;
        try {
            // We get walls concerned by an user
            const walls = await Wall.findWallsWithUserInfo(userId);
           
            console.log('walls : ' + JSON.stringify(walls));
            // Initialization of an Array to push all the walls ids in
            const ArrayOfWallIds = [];
            // We put the id of each wall in ArrayOfWallIds
            for (const wall of walls){
                const wallId = wall.id;
                ArrayOfWallIds.push(wallId)
            }console.log(ArrayOfWallIds)
                        
            // We get in database all informations about collaborators of one wall
            const collabsData = await Wall.findCollabsInfoByWallId(ArrayOfWallIds)
           
            res.status(200).json({result : walls,collabsData});
            // res.status(200).json({result : walls});

         
        } catch (error) {
            console.error(error);
            if (error instanceof User.NoDataError) {
                return res.status(404).json(error.message);
            }
        }
    },

  // Get wall by id  with informations
  listWallById: async function (req, res){
    const wallId = req.params.id;
      try {
          // We get wall with wall id
          const wall = await Wall.findOne(wallId);
          console.log('wall : ' + JSON.stringify(wall));
          // We get in database all informations about collaborators of the wall
          const collabsData = await Wall.findCollabsInfoByWallId(wallId);
            
          res.status(200).json({result:wall,collabsData});
         
       
      } catch (error) {
          console.error(error);
          if (error instanceof User.NoDataError) {
              return res.status(404).json(error.message);
          }
      }
  },

    // Add new wal
    addWall: async function (req, res){

        const userId = req.userId;
        console.log('userId : '+ userId)

        try {
            
            console.log('req.body : '+ JSON.stringify(req.body));
            console.log('req.file: '+ JSON.stringify(req.file));
            // we get the path of the photo (and we remove "public/" in the path) and insert it in req.body
            if(req.file){
                req.body.photo = req.file.filename;
            }else{
                req.body.photo = ""
            };
            // We create a new instance of Wall and save it in database
            const newWall = new Wall(req.body);
            console.log(newWall);
            await newWall.saveInWall(userId);
            // We get the new wall id in database
            const wall = await Wall.findByTitle(req.body.title);
            const wallId = wall.id;

                // If there are collaborators then we transform req.body.users into an array of integers         
                if(req.body.users){
                    const collabIdsInit = (req.body.users).split(',');
                    const collabIds = collabIdsInit.map(id => parseInt(id));

                    // We add the owner_id of the wall in collabIds to save collaboratos and owner in "participate" table
                    collabIds.push(userId);
                    console.log('collabsIDs: ' + collabIds);
                    // Inisialization of an array to stock all ids
                    collabIdsArray = [];
                    // We save wallId and collabId in "participate" table 
                    for (const collab of collabIds){
                        collabId = parseInt(collab);
                        // we push every id in collabIdsArray
                        collabIdsArray.push(collabId);
                        await newWall.saveWallInParticipate(wallId,collabId);
                    };
                    console.log(collabIdsArray);
                    // We get all informations about collaborators with collaborators ids
                    const collabsData = await User.findByIds(collabIdsArray);
                    console.log('collabsData: ' + JSON.stringify(collabsData));

                    
                    res.status(200).json({result: {wall_id:wallId},collabsData,newWall})

                // If the owner is the only one collaborator of the wall 
                }else {const collabId = parseInt(userId);
                
                    console.log('collabsIDs: ' + collabId);
                    // we save the wallId and the collabId in "participate" table
                    await newWall.saveWallInParticipate(wallId,collabId);
                
                    // We get all informations about the collaborator with collaborator id
                    const collabsData = await User.findByIds(collabId);
                    console.log('collabsData: ' + JSON.stringify(collabsData));
        
                    
                    res.status(200).json({result: {wall_id:wallId},collabsData,newWall})
                        
                };


        } catch (error) {
            console.error(error)
            if (error instanceof Wall.NoDataError) {
                return res.status(404).json(error.message)
            }
        }
    },

    deleteWall: async function (req, res){
        // We get parameters needed
        wallId = req.params.id;
        console.log('id du mur supprimé : '+ wallId);
                
        try {
            // First we get the name of the photo in database to remove it from 'public' folder
            const wallData = await Wall.findOne(wallId);
            const wallDataPhoto = wallData.photo;
            console.log('wallDataPhoto supprimée : ' + wallDataPhoto);
            // If there is a photo we remove it from public folder 
            if (wallDataPhoto !=''){
                await fs.remove(`public/${wallDataPhoto}`);
            }
            // We delete a wall with id in database
            await Wall.deleteWallById(wallId);                        
            return res.status(200).json({message:'mur bien supprimé'});


        } catch (error) {
            console.error(error)
           
        }
    },

    // Modify existing wall
    updateWall: async function (req, res){

        const wallId = req.params.id;
        console.log('wallId : '+ wallId);
        const userId = req.userId;

        try {
            
            console.log('req.body : '+ JSON.stringify(req.body));
            console.log('req.file: '+ JSON.stringify(req.file));
            // we get the path of the photo (and we remove "public/" in the path) and insert it in req.body
            if(req.file){
                req.body.photo = req.file.filename;
            };
            // We create a new instance of Wall and save it in database
            const newWall = new Wall(req.body);
            console.log(newWall);
            const updatedWall = await newWall.update(wallId);

            // We delete all colaborators of a wall to resave them in case there were modified
            await Wall.deleteCollabs(wallId);                        
            // /*return*/ res.status(200).json({message:'collaborateurs bien supprimé'});

            // We transform req.body.users into an array of integers         
            const collabIdsInit = (req.body.users).split(',');
            const collabIds = collabIdsInit.map(id => parseInt(id));
            console.log('collabsIDs: ' + collabIds);
            // Inisialization of an array to stock all ids
            collabIdsArray = [];
            // We save wallId and collabId in "participate" table 
            for (const collab of collabIds){
                collabId = parseInt(collab);
                // we push every id in collabIdsArray
                collabIdsArray.push(collabId);
                await newWall.saveWallInParticipate(wallId,collabId);
            };
            console.log(collabIdsArray);

            const collabsData = await User.findByIds(collabIdsArray);
            console.log('collabsData: ' + JSON.stringify(collabsData));

            console.log('updatedWall : ', updatedWall);
            
            res.status(200).json({result : updatedWall, collabsData});


        } catch (error) {
            console.error(error)
            if (error instanceof Wall.NoDataError) {
                return res.status(404).json(error.message)
          
             }
        }
    
    }    

}

module.exports = wallController;