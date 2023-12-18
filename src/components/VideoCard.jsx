import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addToHistory, deleteVideo } from '../services/allAPI';

function VideoCard({ displayVideo,setDeleteVideoStatus }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = async() => {
        setShow(true);
        // call function to store details to watch history
        const {caption,embededLink}=displayVideo;
        console.log("Video Details");
        console.log(caption);
        console.log(embededLink);
        const today=new Date;
        const timeStamp=new Intl.DateTimeFormat('en-US',{
            year:'numeric',
            month:'2-digit',
            hour:'2-digit',
            minute:'2-digit',
            second:'2-digit'
        }).format(today)
        console.log(timeStamp);
        let videoDetails={
            caption:caption,
            embededLink:embededLink,
            timeStamp:timeStamp
        }
        await addToHistory(videoDetails)
    };
    const removeVideo = async (id) => {
        const response = await deleteVideo(id);
        console.log(response);
        setDeleteVideoStatus(true);
    }

    const dragStarted=(e,id)=>{
        console.log(`video card with id ${id} started dragging`);
        e.dataTransfer.setData("VideoId",id)
    }

    return (
        <>
            <Card style={{ width: '100%',height:"350px" }} className='mt-5 mb-5'
            draggable onDragStart={(e)=>dragStarted(e,displayVideo.id)} >
                <Card.Img height="250px" variant="top" src={displayVideo.url} onClick={handleShow} />
                <Card.Body>
                    <div className='d-flex align-items-center justify-content-evenly'><h6>{displayVideo.caption}</h6>
                        <Button variant="danger" className='ms-5' onClick={() => removeVideo(displayVideo.id)}>
                            <i class="fa-solid fa-trash"></i></Button>
                    </div>
                </Card.Body>
            </Card>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <iframe width="100%" height="400" src={displayVideo.embededLink} allowfullscreen></iframe>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary">Play</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default VideoCard