import React, {useState} from 'react';
import styles from './Address.module.scss'
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';

interface IProps {
    address: string
}

const Address = ({ address }: IProps) => {
    const [mapVisibility, setMapVisibility] = useState(false)

    return (
        <div className={styles.address}>
            <h2 className={'blockTitle'}>Адрес</h2>
            <p>{address}</p>
            <span className={styles.mapToggle}
                  onClick={() => setMapVisibility(!mapVisibility)}>{mapVisibility ? 'Скрыть карту' : 'Показать карту'}</span>
            {mapVisibility &&
                <YMaps>
                    <Map width={630} height={380} defaultState={{center: [43.286586, 45.711402], zoom: 17}}>
                        <Placemark geometry={[43.286586, 45.711402]}/>
                    </Map>
                </YMaps>}
        </div>

    );
};

export default Address;