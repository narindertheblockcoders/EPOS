import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';





import React from 'react'

const VideoModal = (props) => {
  return ( 
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    backdrop="static"
  >
    <Modal.Header closeButton>
   
    </Modal.Header>
    <Modal.Body>
       <iframe src="https://player.vimeo.com/video/711429641?h=51271188df&title=0&byline=0&portrait=0" width="770" height="480" frameborder="0"  autoPlay={true} allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

    </Modal.Body>
    {/* <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer> */}
  </Modal>
  )
}

export default VideoModal

