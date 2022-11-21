import React from 'react'
import { Text } from '../text'
import { Images } from '../../utils/images'

export const FourOFour = (props) => {
    return (
        <div className="text-center w-100 px-3">
            <img src={Images.FourOFour} className="img-fluid" alt="..." />
            <Text className="text-muted fs-15 mt-4">{props.message}</Text>
        </div>
    );
};
