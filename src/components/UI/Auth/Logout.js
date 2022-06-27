import { useDispatch } from 'react-redux';
import * as actions from './../../../store/actions';

export const Logout = (props) => {
    const dispatch = useDispatch();
    dispatch(actions.logout_user());
    return (null)
}