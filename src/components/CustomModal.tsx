import { Container, Modal } from "@mui/material";
import React, { ReactElement, useState } from "react";
import Confirmation from "./common/Confirmation";

type Props = {
  onClose: () => void;
  children: ReactElement
  closeConfirmationText?: string;
};

const CustomModal: React.FC<Props> = ({ onClose, closeConfirmationText, children }) => {
  const [confirmationIsVisible, setConfirmationIsVisible] = useState(false);

  function handleModalClose() {
    if (closeConfirmationText) {
      setConfirmationIsVisible(true)
    } else {
      onClose()
    }
  }

  return (
    <>
      <Modal
        open
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        onClose={ handleModalClose }
      >
        <Container sx={{maxHeight: "80vh", overflowY: "auto"}}>{children}</Container></Modal>
      {confirmationIsVisible && closeConfirmationText && (
        <Confirmation
          title={"Close window?"}
          body={closeConfirmationText}
          onSubmit={onClose}
          onCancel={() => setConfirmationIsVisible(false)}
        />
      )}
    </>
  );
};

export default CustomModal;
