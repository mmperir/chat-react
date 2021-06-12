import firebase from "firebase";
import { FC } from "react";
import style from "./style.module.scss";

interface ChatsListItemsProps {
  onClick: VoidFunction;
  chatDocument: firebase.firestore.QueryDocumentSnapshot;
  selectedChat: boolean;
}

const ChatsListItems: FC<ChatsListItemsProps> = ({
  onClick,
  chatDocument,
  selectedChat,
}) => {
  return (
    <div
      style={{ filter: selectedChat ? "brightness(0.85)" : undefined }}
      className={style.chatsListItems}
      onClick={onClick}
    >
      {chatDocument.data().name}
    </div>
  );
};

export default ChatsListItems;
