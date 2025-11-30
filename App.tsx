import React, { useState, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Platform,
} from "react-native";
import type { TextInput as TextInputType } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";

type NameItem = {
    id: string;
    value: string;
};

export default function App() {
    const [name, setName] = useState("");
    const [names, setNames] = useState<NameItem[]>([]);

    const inputRef = useRef<TextInputType | null>(null);

    const handleAdd = () => {
        const trimmed = name.trim();
        if (!trimmed) return;

        setNames((prev) => [...prev, { id: Date.now().toString(), value: trimmed }]);
        setName("");

        // Re-focus après ajout (Enter ou clic sur +)
        requestAnimationFrame(() => {
            inputRef.current?.focus();
        });
    };

    const handleSubmitEditing = () => {
        handleAdd();
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar style="dark" backgroundColor="#f5f5f5" />
                <Text style={styles.title}>Liste de prénoms</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        ref={inputRef}
                        style={styles.input}
                        placeholder="Nouveau prénom..."
                        value={name}
                        onChangeText={setName}
                        onSubmitEditing={handleSubmitEditing}
                        submitBehavior="submit"
                        // Empêche React Native Web de faire un blur après Enter pour garder le focus
                        blurOnSubmit={Platform.OS === "web" ? false : undefined}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleAdd}>
                        <AntDesign name="plus" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>

                <FlatList<NameItem>
                    data={names}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.itemText}>{item.value}</Text>
                        </View>
                    )}
                    contentContainerStyle={styles.list}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f3f3",
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#4f4f4e",
        marginBottom: 20,
        textAlign: "center",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    input: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        fontSize: 16,
        marginRight: 10,
    },
    button: {
        backgroundColor: "#ca0101",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
    },
    itemText: {
        fontSize: 18,
        color: "#333",
    },
});
