import { useDispatch, useSelector } from "react-redux";

import {
    onCloseDateModal,
    onOpenDateModal,
    type AppDispatch,
    type RootState,
} from "@/store";

export const useUiStore = () => {
    const { isDateModalOpen } = useSelector((state: RootState) => state.ui);
    const dispatch = useDispatch<AppDispatch>();

    const openDateModal = () => {
        dispatch(onOpenDateModal());
    };

    const closeDateModal = () => {
        dispatch(onCloseDateModal());
    };
    return {
        isDateModalOpen,
        openDateModal,
        closeDateModal,
    };
};
