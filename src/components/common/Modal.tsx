import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from "react";

interface ModalProps {
  modal: boolean;
  setModal: (modal: boolean) => void;
}

export default function BasicModal({ modal, setModal }: ModalProps) {
  const [selectedImage, setSelectedImage] = useState<any>();
  const handleClose = () => setModal(false);

  const imageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files);
    }
  };

  const removeSelectedImage = () => setSelectedImage(undefined);

  useEffect(() => {
    if (!modal) setSelectedImage(undefined);
  }, [modal]);

  return (
    <>
      <Modal
        open={modal}
        onClose={handleClose}
        sx={{ width: 800 }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex-row space-y-3 relative">
          <div className="bg-purple-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
            <p>Category</p>
          </div>
          <div className="flex justify-between">
            <label className="font-semibold pr-2">Name</label>
            <input className="border-2 border-purple-600/50 w-[75%] " type="text" />
          </div>
          <div className="flex justify-between">
            <label className="font-semibold pr-2">Category</label>
            <select className="border-2 border-purple-600/50 w-[75%]">
              <option value="">Choose any Category</option>
              <option value="">Option One</option>
              <option value="">Option Two</option>
              <option value="">Option Three</option>
            </select>
          </div>
          <div className="flex-row justify-between">
            <label className="font-semibold pr-2">Picture</label>
            <Button variant="contained" component="label">
              Upload
              <input className="border-2" hidden accept="image/*" multiple type="file" onChange={imageChange} name="user[image]" />
            </Button>
            <div className="flex overflow-auto my-2 p-2">
              {
                selectedImage && [...selectedImage].map((file, index) => <img key={index} src={URL.createObjectURL(file)} className="w-32 h-32 mr-1 rounded-sm border-4" />)
              }
            </div>
            {selectedImage &&
              <button onClick={removeSelectedImage} className='bg-orange-400 p-2 rounded-md text-white'>
                Remove This Image
              </button>
            }
          </div>
          <div className="flex justify-between">
            <button className="bg-gray-700 text-white p-3 w-full mt-5 text-lg">Submit</button>
          </div>
        </div>
      </Modal>
    </>
  );
}
