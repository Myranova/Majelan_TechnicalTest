import React from 'react';
import { Image, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { MealProps } from '../../types/MealType'

interface MethodProps {
    onClickMeal: () => void
}

export default class MealComponent extends React.PureComponent<MealProps & MethodProps, {}> {
    render() {
        const {idMeal, strMeal, strMealThumb, onClickMeal} = this.props;
        return (
                <TouchableHighlight onPress={onClickMeal}>
                    <View style={style.blackBorder}> 
                        <Text>{ idMeal } </Text> 
                        <Text> { strMeal } </Text>
                        <Image
                            style={{width: 100, height: 100}}
                            source={{uri: strMealThumb }} />
                    </View>
                    
                </TouchableHighlight>
        )
    }
}

const style = StyleSheet.create({
    blackBorder : {
        borderWidth: 10,
        borderColor: "black"
    }
})