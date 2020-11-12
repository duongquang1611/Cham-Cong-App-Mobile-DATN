import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';

export default function RadioButtom(props) {
  const {
    id,
    data,
    style,
    isSelected,
    disabled,
    innerSize,
    outerSize,
    outerThickness,
    colorSelected,
    colorUnselected,
    colorDisabled,
    ////
    styleContainerLabel,
    styleLabel,
    colorLabel,
    styleLabelSelected,
    ///
    onSelected,
    onPressButton,
    onPressLabel,
    contentView,
  } = props;

  const unselectedRadioStyle = () => {
    return {
      height: outerSize,
      width: outerSize,
      borderRadius: outerSize / 2,
      borderWidth: outerThickness,
      borderColor: disabled
        ? colorDisabled
        : isSelected
        ? colorSelected
        : colorUnselected,
    };
  };
  const selectedRadioStyle = () => {
    return {
      height: innerSize / 2,
      width: innerSize / 2,
      borderRadius: innerSize / 4,
      backgroundColor: disabled
        ? colorDisabled
        : isSelected
        ? colorSelected
        : colorUnselected,
    };
  };

  let styleContainer = [styles.styleBody, style, {opacity: disabled ? 0.4 : 1}];
  let stylesLabel = [
    styles.styleLabel,
    styleLabel,
    {opacity: disabled ? 0.4 : 1, fontWeight: isSelected ? '700' : '300'},
    isSelected && styleLabelSelected,
  ];

  const handleOnSelected = () => {
    onSelected && onSelected({id: props.id, data});
  };

  const onPressButtonItem = () => {
    if (onPressButton) {
      onPressButton({id, data});
    } else {
      onSelected && onSelected();
    }
  };

  const onPressLabelItem = () => {
    if (onPressLabel) {
      onPressLabel({id, data});
    } else {
      onSelected && onSelected();
    }
  };
  // console.log("innerSize ",isSelected)
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={handleOnSelected}>
      <View style={styleContainer}>
        <TouchableWithoutFeedback
          disabled={disabled}
          onPress={onPressButtonItem}>
          <View style={[styles.radio, unselectedRadioStyle()]}>
            {isSelected ? <View style={selectedRadioStyle()} /> : null}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          disabled={disabled}
          style={styles.containerLabel}
          onPress={onPressLabelItem}>
          {contentView ? (
            contentView
          ) : (
            <Text style={stylesLabel}>{data?.name}</Text>
          )}
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

RadioButtom.propTypes = {
  id: PropTypes.any,
  data: PropTypes.object,
  isSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  innerSize: PropTypes.number,
  outerSize: PropTypes.number,
  outerThickness: PropTypes.number,
  colorSelected: PropTypes.string,
  colorUnselected: PropTypes.string,
  colorDisabled: PropTypes.string,
  onSelected: PropTypes.func,
  onPressButton: PropTypes.func,
  onPressLabel: PropTypes.func,
};

RadioButtom.defaultProps = {
  innerSize: 20,
  outerSize: 20,
  outerThickness: 2,
  // isSelected: true,
  // disabled: true,
  colorSelected: '#03A8A7',
  colorUnselected: '#5C6979',
  colorDisabled: '#999999',
};

const styles = StyleSheet.create({
  styleBody: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
  },

  styleContainerItem: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  containerLabel: {height: '100%'},
  styleLabel: {
    paddingVertical: 1,
    marginVertical: 1,
    textAlignVertical: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  radio: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
