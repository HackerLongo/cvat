// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Col } from 'antd/lib/grid';
import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';
import Checkbox from 'antd/lib/checkbox';
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';
import Text from 'antd/lib/typography/Text';

import consts from 'consts';

interface Props {
    attrInputType: string;
    attrValues: string[];
    attrValue: string;
    attrName: string;
    attrID: number;
}

function attrIsTheSame(prevProps: Props, nextProps: Props): boolean {
    return (
        nextProps.attrID === prevProps.attrID &&
        nextProps.attrValue === prevProps.attrValue &&
        nextProps.attrName === prevProps.attrName &&
        nextProps.attrInputType === prevProps.attrInputType &&
        nextProps.attrValues
            .map((value: string, id: number): boolean => prevProps.attrValues[id] === value)
            .every((value: boolean): boolean => value)
    );
}

function ItemAttributeComponent(props: Props): JSX.Element {
    const {
        attrInputType, attrValues, attrValue, attrName,
    } = props;

    const attrNameStyle: React.CSSProperties = { wordBreak: 'break-word', lineHeight: '1em' };

    if (attrInputType === 'checkbox') {
        return (
            <Col span={24}>
                <Checkbox className='cvat-object-item-checkbox-attribute' checked={attrValue === 'true'} disabled>
                    <Text style={attrNameStyle} className='cvat-text'>
                        {attrName}
                    </Text>
                </Checkbox>
            </Col>
        );
    }

    if (attrInputType === 'radio') {
        return (
            <Col span={24}>
                <fieldset className='cvat-object-item-radio-attribute'>
                    <legend>
                        <Text style={attrNameStyle} className='cvat-text'>
                            {attrName}
                        </Text>
                    </legend>
                    <Radio.Group size='small' value={attrValue} disabled>
                        {attrValues.map(
                            (value: string): JSX.Element => (
                                <Radio key={value} value={value}>
                                    {value === consts.UNDEFINED_ATTRIBUTE_VALUE ? consts.NO_BREAK_SPACE : value}
                                </Radio>
                            ),
                        )}
                    </Radio.Group>
                </fieldset>
            </Col>
        );
    }

    if (attrInputType === 'select') {
        return (
            <>
                <Col span={8} style={attrNameStyle}>
                    <Text className='cvat-text'>{attrName}</Text>
                </Col>
                <Col span={16}>
                    <Select size='small' disabled value={attrValue} className='cvat-object-item-select-attribute'>
                        {attrValues.map(
                            (value: string): JSX.Element => (
                                <Select.Option key={value} value={value}>
                                    {value === consts.UNDEFINED_ATTRIBUTE_VALUE ? consts.NO_BREAK_SPACE : value}
                                </Select.Option>
                            ),
                        )}
                    </Select>
                </Col>
            </>
        );
    }

    if (attrInputType === 'number') {
        const [min, max, step] = attrValues.map((value: string): number => +value);
        return (
            <>
                <Col span={8} style={attrNameStyle}>
                    <Text className='cvat-text'>{attrName}</Text>
                </Col>
                <Col span={16}>
                    <InputNumber
                        size='small'
                        disabled
                        value={+attrValue}
                        className='cvat-object-item-number-attribute'
                        min={min}
                        max={max}
                        step={step}
                    />
                </Col>
            </>
        );
    }

    return (
        <>
            <Col span={8} style={attrNameStyle}>
                <Text className='cvat-text'>{attrName}</Text>
            </Col>
            <Col span={16}>
                <Input size='small' disabled value={attrValue} className='cvat-object-item-text-attribute' />
            </Col>
        </>
    );
}

export default React.memo(ItemAttributeComponent, attrIsTheSame);
