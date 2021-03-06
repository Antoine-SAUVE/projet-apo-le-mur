import { useDispatch, useSelector } from 'react-redux';
import submitBtn from 'src/assets/icons/submit-neg.png';
import { clearLoginErrors, storeUSerInputValue, submitUserLogin } from '../../actions/users';
import Input from '../inputForm/inputs';

const NotLogged = () => {
  const dispatch = useDispatch();
  const passwordInputValue = useSelector((state) => state.user.credentials.password);
  const emailInputValue = useSelector((state) => state.user.credentials.email);
  const logErrors = useSelector((state) => state.user.logError);

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    dispatch(storeUSerInputValue(name, value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(clearLoginErrors());
    await dispatch(submitUserLogin());
  };
  return (
    <div className="userMenu__login">
      <form className="dark testInput" onSubmit={handleSubmit}>
        <Input type="text" label="email" name="email" changeInput={handleChangeInput} value={emailInputValue} />
        <Input type="password" label="password" name="password" changeInput={handleChangeInput} value={passwordInputValue} />
        <button className="userMenu__submitBtn" type="submit"><img className="userMenu__submitBtn__img" src={submitBtn} alt="submit" /></button>
        {logErrors && <div className="userMenu__errors">{logErrors}</div>}
      </form>
    </div>
  );
};

export default NotLogged;
