import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import RadioButtom from './RadioButtom';

export default function RadioGroup(props) {
  const {
    id,
    data,
    currentIndex,
    renderItem,
    style,
    children,
    styleChildren,
    colorSelected,
    colorUnselected,
    colorDisabled,
    styleLabel,
    horizontal,
    isWrap,
    onSelected,
    onPressButton,
    onPressLabel,
    innerSize,
    outerSize,
    outerThickness,
  } = props;
  const [indexSelected, setIndexSelected] = useState(currentIndex);
  useEffect(() => {
    currentIndex !== indexSelected && setIndexSelected(currentIndex);
  }, [currentIndex]);

  const handleOnSelected = ({id, data}) => {
    onSelected && onSelected({id: props.id, data});
    setIndexSelected(id);
  };

  const handleOnPressButton = ({id, data}) => {
    if (onPressButton) {
      onPressButton({id: props.id, data});
      setIndexSelected(id);
    } else {
      handleOnSelected({id, data});
    }
  };

  const handleOnPressLabel = ({id, data}) => {
    if (onPressLabel) {
      onPressLabel({id: props.id, data});
    } else {
      handleOnSelected({id, data});
      //   setIndexSelected(id);
    }
  };

  const renderRadioDefault = (element, index) => {
    return (
      <RadioButtom
        key={index}
        id={index}
        style={styleChildren}
        data={element}
        isSelected={index === indexSelected}
        styleLabel={styleLabel}
        colorSelected={colorSelected}
        colorUnselected={colorUnselected}
        colorDisabled={colorDisabled}
        onSelected={handleOnSelected}
        onPressButton={handleOnPressButton}
        onPressLabel={handleOnPressLabel}
        innerSize={innerSize}
        outerSize={outerSize}
        outerThickness={outerThickness}
      />
    );
  };

  const renderContent = () => {
    if (data.length) {
      if (renderItem) {
        return data.map(renderItem);
      } else {
        return data.map(renderRadioDefault);
      }
    } else {
      return children;
    }
  };

  return isWrap ? (
    <View style={[styles.styleBody, style, {flexWrap: 'wrap'}]}>
      {renderContent()}
    </View>
  ) : (
    <ScrollView
      style={[styles.styleBody, style]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={horizontal}>
      {renderContent()}
    </ScrollView>
  );
}

RadioGroup.propTypes = {
  id: PropTypes.any,
  data: PropTypes.array,
  currentIndex: PropTypes.number,
  // renderItem:
  style: PropTypes.object,
  colorSelected: PropTypes.string,
  colorUnselected: PropTypes.string,
  colorDisabled: PropTypes.string,
  onSelected: PropTypes.func,
  onPressButton: PropTypes.func,
  onPressLabel: PropTypes.func,
  innerSize: PropTypes.number,
  outerSize: PropTypes.number,
  outerThickness: PropTypes.number,
};

RadioGroup.defaultProps = {
  data: [],
};
