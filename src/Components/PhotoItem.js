import React from 'react';
import {
    Card,
    CardImg,
    CardBody,
    CardHeader,
    CardFooter,
    Badge,
    Button,
} from 'reactstrap';

import Loading from './Loading';

const PhotoItem = props => {
    // console.log('From PhotoItem:', props);
    let header,
        footer,
        footerBadge,
        opacity,
        leaveButton = null;

    if (
        !props.fromCategory &&
        props.object &&
        !props.object.isAvailable &&
        props.object.bookedBy === props.userId
    ) {
        // console.log('Leave Button:', props.object, props.userId);
        leaveButton = true;
    }

    if (props.fromCategory) {
        header = <strong>{props.name}</strong>;
        // headerBadge = 'primary';
        footer = (
            <span>
                Rooms Available:
                <Badge
                    color='warning'
                    className='ml-4'
                    style={{ fontSize: '100%', color: 'black' }}
                >
                    {props.object ? (
                        props.object.roomsLeft
                    ) : (
                        <Loading></Loading>
                    )}
                </Badge>
            </span>
        );
        footerBadge = props.object
            ? props.object.roomsLeft
                ? 'success'
                : 'danger'
            : 'info';
    } else {
        header = (
            <span>
                Room No. <strong className='stylish'>{props.name}</strong>
            </span>
        );
        // headerBadge = 'primary';
        footer = props.object ? (
            props.object.isAvailable ? (
                'Available for Booking'
            ) : (
                'Booked / Not Available'
            )
        ) : (
            <Loading></Loading>
        );
        footerBadge = props.object
            ? props.object.isAvailable
                ? 'success'
                : 'danger'
            : 'warning';
        opacity = props.object
            ? props.object.isAvailable
                ? '100%'
                : '50%'
            : '30%';
    }

    return (
        <div>
            <Card style={{ cursor: 'pointer' }} onClick={props.PhotoSelect}>
                <CardHeader
                    className='bg-dark text-center text-white py-2'
                    style={{
                        textTransform: 'uppercase',
                        fontSize: '120%',
                    }}
                >
                    {header}
                </CardHeader>
                <CardBody className='px-0 py-0'>
                    <CardImg
                        width='100%'
                        height='200vw'
                        alt='photo'
                        src={props.src}
                        style={{ opacity: opacity, objectFit: 'cover' }}
                    />
                </CardBody>
                <CardFooter
                    className='bg-dark text-white text-center py-2'
                    style={{
                        textTransform: 'uppercase',
                    }}
                >
                    {leaveButton ? (
                        <Button
                            color='warning'
                            style={{ color: 'black' }}
                            className='py-0 my-0'
                            onClick={props.leaveRoom}
                        >
                            <strong>Leave Room</strong>
                        </Button>
                    ) : (
                        <Badge color={footerBadge} style={{ fontSize: '110%' }}>
                            {footer}
                        </Badge>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default PhotoItem;
