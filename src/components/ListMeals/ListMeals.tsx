import React from 'react';
import { SearchBar } from 'react-native-elements';
import { ActivityIndicator, View, FlatList } from 'react-native';
import _ from 'lodash';
import Meal from '../Meal/Meal';
import { MealProps} from '../../types/MealType';
import { FullDetailMealProps } from '../../types/FullDetailsMealType';
import ModalDetailsMeal from '../ModalDetailsMeal';

export interface Category {
    idCategory: string,
    strCategory: string,
    strCategoryThumb: string,
    strCategoryDescription: string,
}

interface ListMealState {
    isLoading: boolean,
    filteredMealList: MealProps[],
    fullMealList: MealProps[],
    searchQuery: string,
    modalVisible: boolean,
    detailsMealClicked: FullDetailMealProps,
}

export default class ListMealComponent extends React.Component<{}, ListMealState > {
    constructor(props: {}) {
        super(props);
        this.state = {
            isLoading: true,
            filteredMealList: [],
            fullMealList: [],
            searchQuery: "",
            modalVisible : false,
            detailsMealClicked: {
                idMeal: "",
                strMeal: "",
                strMealThumb: "",
                ingredients: ""
            },
        }
    }

    onClickMeal = () => {
        this.setState({
            modalVisible: true,
        })
    }

    onCloseModal = () => {
        this.setState({
            modalVisible: false
        })
    }

    renderSearchBar = () => {
        return <SearchBar placeholder="Type Here..."
                    lightTheme round
                    onChangeText={this.handleSearch}
                    value={this.state.searchQuery}/>
    }
    
    handleSearch = (text: string) => {
        console.log("search query : " + text);
        const formatQuery = text.toLowerCase();
        const filteredMealList = _.filter(this.state.fullMealList, meal => {
            return meal.strMeal.toLowerCase().includes(formatQuery);
        })
        this.setState({
            searchQuery: text,
            filteredMealList
        })
    }

    componentDidMount() {
        return fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then((response) => response.json())
            .then((responseJson => {
                var fullMealList = [] as MealProps[];
                responseJson.categories.map((category: Category) => {
                    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`)
                    .then((response) => response.json())
                    .then(responseJson => {
                        fullMealList = fullMealList.concat(responseJson.meals);
                        this.setState({
                            fullMealList,
                            filteredMealList: fullMealList,
                            isLoading: false,
                      })
                    })
                })
                
            })).catch((error) => {
                console.log("error", error);
            })
    }
                    
    render() {
        const { isLoading } = this.state;
        if (isLoading) {
            return (
                <View>
                    <ActivityIndicator/>
                </View>
            )
        }
        else {
            return (
                <View>
                    <FlatList
                        data={this.state.filteredMealList}
                        renderItem={({item}) => <Meal {...item} onClickMeal={this.onClickMeal}/>}
                        keyExtractor={({idMeal}) => idMeal}
                        ListHeaderComponent={this.renderSearchBar}
                    />
                    <ModalDetailsMeal
                        setVisible={this.onClickMeal}
                        setClose={this.onCloseModal}
                        visible={this.state.modalVisible}
                        detailsMeal={this.state.detailsMealClicked}
                    />
                </View>
            )
        }
    }
}