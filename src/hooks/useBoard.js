import { useGlobalStore } from '../store';
import bindActions from '../store/bindActions';
import * as actions from '../store/actions/board';

const useBoard = () => {
	const { state, dispatch } = useGlobalStore();
	const { board } = state;
	return { board, ...bindActions(actions, dispatch) };
}

export default useBoard;