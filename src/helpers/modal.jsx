
import React, { Component } from 'react';
import { BaseModal, ModalBody } from 'pui-react-modals';

class Modal extends Component {
  render() {
    return (
      <div>
        <BaseModal
          acquireFocus={false}
          title="What a Header!"
        >
          <ModalBody>
            <p>Text in a body</p>
            <input autoFocus placeholder="Translate some text" />
          </ModalBody>
        </BaseModal>
      </div>
    );
  }
}
export default Modal;
