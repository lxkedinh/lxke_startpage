import { PropsWithChildren, useState } from "react";
import { ModalContext } from "../util/contexts";
import Modal from "./Modal";

const ModalProvider = ({ children }: PropsWithChildren) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  return (
    <ModalContext.Provider value={{ setModalOpen, modalText, setModalText }}>
      {children}
      {isModalOpen && <Modal />}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
