import { store } from 'react-notifications-component';

export interface IAlertMessage{
    message: string;
    type: "success" | "danger" | "info" | "default" | "warning";
    duration: number;
}

export const alertMessage = (message: string, type: IAlertMessage["type"], duration: number = 0) => {
    return store.addNotification({
        message,
        type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__backInRight"],
        animationOut: ["animate__animated", "animate__backOutRight"],
        dismiss: {
            duration,
            onScreen: true
        }
    });
}

export const removeMessage = (messageId: string) => {
    store.removeNotification(messageId)
}