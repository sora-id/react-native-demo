import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function PrimaryButton({ label, onPress }) {
    return <TouchableOpacity
        style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'stretch',
            height: 50,
            backgroundColor: '#19488f',
            borderRadius: 50,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0
        }}
        onPress={onPress}
    >
        <Text style={{ color: 'white' }}>{label}</Text>
    </TouchableOpacity>;
}
