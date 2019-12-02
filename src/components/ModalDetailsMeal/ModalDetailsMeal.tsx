import React from 'react';
import { View, Text, Modal} from 'react-native';
import { FullDetailMealProps } from '../../types/FullDetailsMealType'

interface DetailsProps {
    visible: boolean
    setVisible : () => void
    setClose : () => void

}

interface DetailsState {
    someNumber: number
}

export default class ModalDetailsMeal extends React.PureComponent<DetailsProps, DetailsState> {

    constructor(props: DetailsProps & FullDetailMealProps) {
        super(props);
        this.state = {
            someNumber: 10
        }
    }

    render() {
        return(
            <View style={{marginTop: 22}}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.visible}
                    onRequestClose={() => this.props.setClose()}
                >
                    <View style={{marginTop: 22}}>
                        <View>
                            <Text>
                                {this.state.someNumber}
                            </Text>
                        </View>
                    </View>
                </Modal>
         </View>
        )
    }

}