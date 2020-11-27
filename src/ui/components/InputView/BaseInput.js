import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import {Animated, Text, View, ViewPropTypes} from 'react-native';
import {IconView} from '../';
import commons from '../../commons';

export default class BaseInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.input = createRef();
    let value = this.props.value || this.props.defaultValue;
    this.label = this.props.label || null;
    this.placeholder = this.props.placeholder || '';
    this.editable =
      this.props.editable !== undefined ? this.props.editable : true;
    this.labelAnim = new Animated.Value(value ? 1 : 0);
    this.styleContainerAnim = new Animated.Value(this.editable ? 1 : 0);
    this.labelLeft = this.props.labelLeft || 0;
    this.state = {
      focusedAnim: new Animated.Value(value ? 1 : 0),
      value: value,
      numberHad: value ? value.length : 0,
      placeholder: value ? this.label : this.placeholder,
      width: null,
      isError: false,
      secureTextEntry: this.props.secureTextEntry,
    };

    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onPressText = this.onPressText.bind(this);
  }

  onLayout(event) {
    this.setState({
      width: event.nativeEvent.layout.width,
    });
  }

  inputRef = () => {
    return this.input.current;
  };

  clear = () => {
    this.inputRef().clear();
  };

  blur = () => {
    this.inputRef().blur();
  };

  focus = () => {
    if (this.props.editable !== false) {
      this.inputRef().focus();
    }
  };

  isFocused = () => {
    return this.inputRef() && this.inputRef().isFocused();
  };

  onFocus = (event) => {
    this.toggle(true);
    const _onFocus = this.props.onFocus;
    if (_onFocus) {
      _onFocus(event);
    }
  };

  toggle = (isActive) => {
    const {animationDuration, easing, useNativeDriver} = this.props;
    let unds = useNativeDriver !== undefined ? useNativeDriver : true;
    let {value} = this.state;
    this.isActive = isActive;
    this.changeStyleView();
    if (!value) {
      Animated.timing(this.labelAnim, {
        toValue: isActive ? 1 : 0,
        duration: animationDuration,
        easing,
        useNativeDriver: unds,
      }).start();
      this.setState({
        placeholder: isActive ? this.label : this.placeholder,
      });
    }
  };

  onChange = (event) => {
    let convertText = event.nativeEvent.text;
    // this.setState(preState => ({
    //     value: preState.value = convertText,
    // }))
    const _onChange = this.props.onChange;
    if (_onChange) {
      _onChange(event);
    }
  };

  onChangeText = (text) => {
    this.focus();
    let convertText = text;
    let isError = false;
    if (this.props.onConvertText) {
      convertText = this.props.onConvertText({
        id: this.props.id,
        data: convertText,
      });
    }
    if (this.props.handleInputVerify) {
      isError = !this.props.handleInputVerify({id: this.props.id, data: text});
    }
    this.setState(
      (preState) => ({
        value: (preState.value = convertText),
        isError: (preState.isError = isError),
        numberHad: (preState.numberHad = convertText.length),
      }),
      () => {
        if (this.props.onChangeText) {
          this.props.onChangeText({id: this.props.id, data: convertText});
        }
      },
    );
  };

  onPressText = () => {
    const onPressText = this.props.onPressText;
    if (onPressText) {
      onPressText({id: this.props.id, data: this.state.value});
    }
  };

  onClearText = () => {
    this.clear();
    this.onChangeText('');
    this.props.onClearText &&
      this.props.onClearText({id: this.props.id, data: ''});
  };

  onBlur = (event) => {
    this.changeStyleView();
    if (!this.state.value) {
      this.toggle(false);
    }
    const _onBlur = this.props.onBlur;
    if (_onBlur) {
      _onBlur(event);
    }
  };

  handleInputVerify = () => {
    if (this.props.handleInputVerify) {
    }
  };

  changeStyleView = () => {
    let indexStyleAni = 1;
    if (this.editable) {
      if (this.isFocused()) {
        indexStyleAni = 2;
      }
      if (this.state.isError) {
        indexStyleAni = 3;
      }
    } else {
      indexStyleAni = 0;
    }
    this.styleContainerAnim.setValue(indexStyleAni);
  };

  styleContainerInput = (styleContainer) => {
    let borderColor = this.styleContainerAnim.interpolate({
      inputRange: [0, 1, 2, 3],
      outputRange: [
        this.props.colorBorderDisable,
        this.props.colorBorderNormal,
        this.props.colorBorderFocus,
        this.props.colorBorderError,
      ],
      extrapolate: 'clamp',
    });
    return [
      styleContainer,
      this.props.styleContainerInput,
      {borderColor: borderColor},
    ];
  };

  styleTextLabel = (styleLable) => {
    let {height, iconLeft, styleIconLeft, placeholderLeft} = this.props;
    let background1 = this.props.labelStyle.backgroundColor
      ? this.props.labelStyle.backgroundColor
      : null;
    let background2 = this.label ? background1 : 'transparent';
    let holderLeft = 0;
    if (placeholderLeft && placeholderLeft > 0) {
      holderLeft = placeholderLeft;
    } else {
      if (typeof iconLeft === 'string') {
        if (styleIconLeft && styleIconLeft.width) {
          holderLeft = styleIconLeft.width;
        } else {
          holderLeft = commons.widthIconInput;
        }
      }
    }

    // let fontSize = this.labelAnim.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [this.props.placeholderStyle.fontSize || commons.fontSize11, this.props.labelStyle.fontSize || commons.fontSize11],
    // })
    let fontSize =
      (this.isFocused || this.state.value
        ? this.props.labelStyle.fontSize
        : this.props.placeholderStyle.fontSize) || commons.fontSize12;
    let backgroundColor = JSON.stringify(
      this.labelAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [background1, background2],
      }),
    );

    let translateY = this.labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [
        0,
        -height / 2 - fontSize / 2 - (this.props.offsetLabel || 5),
      ],
    });

    let translateX = this.labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [holderLeft + 5, this.labelLeft],
    });

    let color = JSON.stringify(
      this.labelAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [
          this.props.placeholderStyle.color || 'gray',
          this.props.labelStyle.color || 'gray',
        ],
      }),
    );

    // return [styleLable, this.props.labelStyle, {left: left, translateY: translateY, color: color, fontSize: fontSize, backgroundColor: backgroundColor, } ]
    return [
      styleLable,
      this.props.labelStyle,
      {
        transform: [{translateX}, {translateY}],
        color: '#345',
        fontSize: fontSize,
      },
    ];
  };

  styleTextInput = (styleInput) => {
    return [
      styleInput,
      {height: this.props.height},
      !this.editable
        ? this.props.styleInputDisable || {color: this.props.colorTextDisable}
        : this.props.styleTextInput,
    ];
  };

  iconLeft = (stylesIconLeft) => {
    let {
      iconLeftSize,
      iconLeft,
      onPressIconLeft,
      height,
      styleIconLeft,
      typeIconLeft,
      colorIconLeft,
    } = this.props;
    let style = [stylesIconLeft, {height: height}, styleIconLeft];
    let size = iconLeftSize || commons.sizeIcon18;
    if (typeof iconLeft === 'string') {
      return (
        <IconView
          onPress={onPressIconLeft}
          style={style}
          name={iconLeft || 'home'}
          size={size}
          type={typeIconLeft || 'LocalIcon'}
          color={colorIconLeft || commons.colorIcon}
        />
      );
    }
  };

  iconRight = (stylesIconRight) => {
    let {
      iconRightSize,
      iconRight,
      onPressIconRight,
      height,
      styleIconRight,
      typeIconRight,
    } = this.props;
    let style = [stylesIconRight, {height: height}, styleIconRight];
    let size = iconRightSize || commons.sizeIcon18;
    if (typeof iconRight === 'string') {
      return (
        <IconView
          onPress={onPressIconRight}
          style={style}
          name={iconRight || 'home'}
          type={typeIconRight || 'LocalIcon'}
          size={size}
          color={commons.colorIcon}
        />
      );
    } else {
      return iconRight;
    }
  };

  iconClean = (styleIconCleared) => {
    let {
      styleIconClear,
      height,
      iconClean,
      isShowClean = true,
      typeIconClean,
    } = this.props;
    if (!this.props || (iconClean && iconClean.props)) {
      return {iconClean};
    }

    let style = [styleIconCleared, {height: height}, styleIconClear];
    return isShowClean && this.state.value ? (
      <IconView
        onPress={this.onClearText}
        style={style}
        name={iconClean || 'clear'}
        type={typeIconClean || 'LocalIcon'}
        size={commons.sizeIcon14}
        color={commons.colorIcon}
      />
    ) : (
      <View />
    );
  };

  iconShowPassword = (styleIcon) => {
    let {
      colorIconShowPassword,
      sizeIconShowPassword,
      isUseIconShowPassword = true,
      onPressIconShowPassword,
      height,
      styleIconShowPassword,
    } = this.props;
    let style = [styleIcon, {height: height}, styleIconShowPassword];
    let size = sizeIconShowPassword || commons.sizeIcon18;
    let color = colorIconShowPassword || commons.colorIcon;
    let iconShow = this.state.secureTextEntry
      ? this.state.value && 'see'
      : 'not-see';
    const onPress = () => {
      this.setState((prevState) => ({
        secureTextEntry: (prevState.secureTextEntry = !this.state
          .secureTextEntry),
      }));
    };
    return isUseIconShowPassword ? (
      iconShow !== '' ? (
        <IconView
          onPress={onPress}
          style={style}
          name={iconShow}
          size={size}
          color={color}
        />
      ) : (
        <View />
      )
    ) : (
      <View />
    );
  };

  componentDidUpdate(prevProps, prevState) {
    const newValue = this.props.value;
    if (this.props.hasOwnProperty('value') && newValue !== prevProps.value) {
      this.setState({
        value: newValue,
      });
      const isFocused = this.inputRef().isFocused();
      if (!isFocused) {
        const isActive = Boolean(newValue);
        if (isActive !== this.isActive) {
          this.toggle(isActive);
        }
      }
    }
  }
}

BaseInput.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  style: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
  styleIconLeft: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
  inputStyle: Text.propTypes.style,
  labelStyle: Text.propTypes.style,
  easing: PropTypes.func,
  animationDuration: PropTypes.number,
  useNativeDriver: PropTypes.bool,
  editable: PropTypes.bool,

  /////
  colorTextDisable: PropTypes.string,
  colorBorderNormal: PropTypes.string,
  colorBorderFocus: PropTypes.string,
  colorBorderError: PropTypes.string,
  colorBorderDisable: PropTypes.string,

  /* those are TextInput props which are overridden
   * so, i'm calling them manually
   */
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,

  placeholderLeft: PropTypes.number,
  labelLeft: PropTypes.number,
};

BaseInput.defaultProps = {
  // height: 48,
  iconColor: '#00aeef',
  iconSize: 20,
  iconWidth: 40,
  inputPadding: 16,
  passiveIconColor: '#a3a3a3',
  animationDuration: 300,
};
