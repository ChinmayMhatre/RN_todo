import React, { useState, useEffect } from "react";
import { Text, StyleSheet, StatusBar, View } from "react-native";

import { Item, Input, Button } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Edit = ({ route, navigation }) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        const { item } = route.params;
        const { id, title } = item;
        setTitle(title);
        console.log(title);
        setId(id);
    }, []);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@todo_list");
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log(e);
            setError("something went wrong");
        }
    };

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem("@todo_list", jsonValue);
        } catch (e) {
            console.log(e);
            setError("something went wrong");
        }
    };

    const handleSubmit = async () => {
        if (title.length > 10) {
            setError("length must be under 10 characters");
        } else if (title.length == 0) {
            setError("Input cannot be empty");
        } else {
            const data = await getData();
            const newList = data.map((i) => {
                if (i.id == id) {
                    i.title = title;
                }
                return i;
            });

            storeData(newList);

            // data.push(item)
            // storeData(data)

            navigation.navigate("Home");
        }
    };

    return (
        <>
            <StatusBar backgroundColor="#141E30" />
            <View style={styles.container}>
                <Text style={styles.heading}>Edit the Item</Text>
                <View style={styles.inputContainer}>
                    {/* <Item style={styles.input}> */}
                    <Input
                        placeholder="Title"
                        style={{
                            color: "#fff",
                            width: "80%",
                            marginBottom: 30,
                            borderColor: "#3c8dad",
                        }}
                        onChangeText={(text) => setTitle(text)}
                        value={title}
                    />
                    {/* </Item>  */}
                    {error ? <Text style={styles.error}>{error}</Text> : <></>}

                    <Button
                        onPress={handleSubmit}
                        style={styles.button}
                        bordered
                    >
                        <Text style={{ color: "#fff" }}>Submit</Text>
                    </Button>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#141E30",
    },
    heading: {
        paddingBottom: 100,
        color: "#fff",
        fontSize: 30,
        textAlign: "center",
        paddingTop: 20,
    },
    button: {
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderColor: "#3c8dad",
        marginTop: 10,
    },
    inputContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        width: "80%",
        marginBottom: 30,
        borderColor: "#3c8dad",
    },
    error: {
        color: "#f54748",
        fontSize: 15,
        paddingBottom: 10,
    },
});

export default Edit;
