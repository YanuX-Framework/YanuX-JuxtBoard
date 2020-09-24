
import { useGlobalStore } from '../store';
import bindActions from '../store/bindActions';
import * as actions from '../store/actions/authentication';

const useAuthentication = () => {
	const { state, dispatch } = useGlobalStore();
	const { authentication } = state;
	return { authentication, ...bindActions(actions, dispatch) };
}

export default useAuthentication;