import { useState } from 'react';
import { Dialog, Button } from "@mui/material";

export const ConfirmButton = () => {
  const [isOpen, setOpen] = useState(false)

  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setOpen(true)
  }

  return (
    <>
      <Dialog open={isOpen} onClose={() => setOpen(false)}>
        Are you sure?
      </Dialog>
      <Button onClick={handleActionClick}>
        Action
      </Button>
    </>
  )
}