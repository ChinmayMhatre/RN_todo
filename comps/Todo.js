import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Checkbox } from "native-base";
import { Icon } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';


const Todo = ({ cardColor, deleteItem, checkHandler, navigation, item }) => {
    const time = new Date();
    const formattime =
        time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear();
    return (
        <View style={[styles.container, { backgroundColor: cardColor }]}>
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subTitle}>{formattime}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Checkbox
                    isChecked={item.isChecked}
                    onPress={() => checkHandler(item.id)}
                    size={40}
                    style={styles.checkbox}
                />
                <Button
                    style={styles.actionButtons}
                    delayPressIn={150}
                    onPress={() => {
                        navigation.navigate("Edit", { item });
                    }}
                >
                    <Icon as={FontAwesome} size={29} color={"#3b3b3b"} name="edit" />
                </Button>
                <Button
                    style={styles.actionButtons}
                    delayPressIn={150}
                    onPress={() => deleteItem(item.id)}
                >
                    <Icon as={FontAwesome} size={29} color={"#3b3b3b"} name="trash" />
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        color: "black",
        height: 90,
        marginTop: 15,
        flexDirection: "row",
        borderRadius: 5,
        elevation: 5,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 17,
        fontWeight: "bold",
    },
    subTitle: {
        fontSize: 12,
        color: "#3b3b3b",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    actionButtons: {
        marginHorizontal: 5,
        backgroundColor: "rgba(0,0,0,0)",
        elevation: 0,
    },
    checkbox: {
        alignSelf: "center",
        marginRight: 20,
        marginLeft: 20,
        width: 25,
        height: 23,
        color: "#3b3b3b",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3b3b3b",
        borderColor: "#3b3b3b",
    },
});

export default Todo;
