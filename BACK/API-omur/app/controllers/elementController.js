const User = require('../models/user');
const Wall = require('../models/wall');
const Element = require('../models/element');
// We require fs-extra to remove files in public folder
const fs = require('fs-extra');

const elementController = {
    // Get elements of a wall
    listElements: async function (req, res){

        const wallId = req.params.id

        try {
            const element = await Element.findByWallId(wallId);
            res.status(200).json(element);
         
        } catch (error) {
            console.error(error);
            if (error instanceof User.NoDataError) {
                return res.status(404).json(error.message);
            }
        }
    },
    // Add new element in a wall
    addElement: async function (req, res){

        const wallId = req.params.id;
        const userId = req.userId;
        console.log('WallId : '+ wallId);
        console.log ('userId : ' + userId);

        try {
            console.log('req.body : '+ JSON.stringify(req.body));
            console.log('req.file: '+ JSON.stringify(req.file));
            // we get the path of the photo (and we remove "public/" in the path) and insert it in req.body
            if(req.body.type == "image"){
                req.body.src = req.file.filename;
            };
            // We create a new instance of element and save it in database
            const newElement = new Element(req.body);
            const recordedElement = await newElement.save(wallId,userId);
            console.log('recordedElement.id : ' + recordedElement.id);
                     
            res.status(200).json(recordedElement)
            }


        catch (error) {
            console.error(error)
            if (error instanceof Wall.NoDataError) {
                return res.status(404).json(error.message)
            }
        }
    },

    // We delete an element from a wall
    deleteElement: async function (req, res){
        //we get differents parameters
        wallId = req.params.id;
        elementId = req.params.id_element;
        console.log('id du mur concerné : '+ wallId);
        console.log('id element supprimé : ' + elementId);
        // We delete the element in database       
        try {
            // First we get the name of the photo in database to remove it from 'public' folder
            if (req.body.type == 'photo'){
                const elementData = await Element.findOne(elementId);
                const elementDataPhoto = elementData.src;
                console.log('elementDataPhoto supprimée : ' + elementDataPhoto);
                // If there is a photo we remove it from public folder 
                if (elementDataPhoto !=''){
                    await fs.remove(`public/${elementDataPhoto}`);
                }

            }

            await Element.deleteOne(elementId);                        
            res.status(200).json({message:'element supprimé'})


        } catch (error) {
            console.error(error)
            }
    },

     // Modify existing element in a wall
    updateElement: async function (req, res){
        // We get different parameters
        const wallId = req.params.id;
        const elementId = req.params.id_element;
        console.log('WallId : '+ wallId);
        console.log ('elementId : ' + elementId);

        try {
            console.log('req.body : '+ JSON.stringify(req.body));
            console.log('req.file: '+ JSON.stringify(req.file));
            // we get the path of the photo (and we remove "public/" in the path) and insert it in req.body
            if(req.file){
                req.body.src = req.file.filename;
            }
            console.log('req.body.src : '+ req.body.src);
            // We create a new instance of element and update it in database
            const newElement = new Element(req.body);
            const updatedElement = await newElement.update(wallId,elementId);
          

            console.log('updatedElement ' + JSON.stringify(updatedElement));
            res.status(200).json(updatedElement)



        } catch (error) {
            console.error(error)
            if (error instanceof Wall.NoDataError) {
                return res.status(404).json(error.message)
            }
        }
    },

        // Modify existing element position in a wall
        updateElementsPosition: async function (req, res){
            // We get different parameters
            const wallId = req.params.id;
            console.log('WallId : '+ wallId);
            
                
            try {
                console.log('req.body : '+ JSON.stringify(req.body));
                const elements = req.body.newDocList;
                // Initialization of an array to push all elements ids with new positions and send it ot the front
                const elementsWithNewPosition = [];
                // For each element we get the id and its position and update in database
                for (const element of elements){
                    const updatedElement= new Element(element);
                    await updatedElement.updatePosition(wallId);
                    elementsWithNewPosition.push(updatedElement);
                    console.log('updated element : ',updatedElement)
                };
                console.log('elementsWithNewPosition : ', elementsWithNewPosition);
                res.status(200).json(elementsWithNewPosition);

            } catch (error) {
                console.error(error)
                if (error instanceof Wall.NoDataError) {
                    return res.status(404).json(error.message)
                }
            }
        },

    

}

module.exports = elementController;