import React, {useContext, useState} from "react";
import { View, FlatList, StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {userContext} from "../../../functions/context/userContext";
import WorkHistoryDisplay from "../../../assets/components/resumeItems/workHistory";
import EducationDisplay from "../../../assets/components/resumeItems/education";
import AwardsDisplay from "../../../assets/components/resumeItems/awards";      
import ReferencesDisplay from "../../../assets/components/resumeItems/references";
import SkillsDisplay from "../../../assets/components/resumeItems/skills";


export default function SelectMenu() {
    
    const {resumeItems, setDataInfo, updateDatabase} = useContext(userContext)

    const [selectedMenu, setSelectedMenu] = useState("workHistory")

    function navigate(location) {
        console.log(location)
        navigation.navigate(location)
    }

    const navigation = useNavigation()

    function deleteItem(key, id) {
        setDataInfo((prev) => ({...prev, [key]: prev[key].filter((item) => item.id !== id)}))
        const temp = resumeItems[key].filter((item) => item.id !== id)
        updateDatabase({path: `Data/${key}`, data: temp})
    }

    function changeMenu(menu) {

        if (menu == "workHistory") {
            return (<View style={styles.menuContent}>
                <Text style={styles.sectionHeader}>Work History</Text>
                <View style={styles.MainFlatList}>
                    <FlatList style={styles.Thing}
                        data={resumeItems.workHistory}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) => (
                            <WorkHistoryDisplay
                                {...item}
                                onEdit={() => navigation.navigate("editworkhistoryview", item)}
                                deleteItem={(id) => deleteItem("workHistory", id)}
                            />
                        )}
                    />
                </View>
                <Pressable style={styles.AddButton} onPress={() => navigate("createworkhistoryview")}>
                    <Text style={styles.ButtonText}>Add Item</Text>
                </Pressable>
            </View>)
            
        } else if (menu == "education") {
            return (<View style={styles.menuContent}>
                <Text style={styles.sectionHeader}>Education</Text>
                <View style={styles.MainFlatList}>
                    <FlatList style={styles.Thing}
                        data={resumeItems.education}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) => (
                            <EducationDisplay
                                {...item}
                                onEdit={() => navigation.navigate("editeducationview", item)}
                                deleteItem={(id) => deleteItem("education", id)}
                            />
                        )}
                    />
                </View>
                <Pressable style={styles.AddButton} onPress={() => navigate("createeducationview")}>
                    <Text style={styles.ButtonText}>Add Item</Text>
                </Pressable>
            </View>)
        } else if (menu == "awards") {
            return (<View style={styles.menuContent}>
                <Text style={styles.sectionHeader}>Awards</Text>
                <View style={styles.MainFlatList}>
                    <FlatList style={styles.Thing} data={resumeItems.awards} renderItem={({ item }) => (
                        <AwardsDisplay {...item} onEdit={() => navigation.navigate("editawardsview", item)} deleteItem={(id) => deleteItem("awards", id)}/>
                    )}/>
                </View>
                <Pressable style={styles.AddButton} onPress={() => navigate("createawardsview")}>
                    <Text style={styles.ButtonText}>Add Item</Text>
                </Pressable>
            </View>)
        } else if (menu == "references") {
            return (<View style={styles.menuContent}>
                <Text style={styles.sectionHeader}>References</Text>
                <View style={styles.MainFlatList}>
                    <FlatList style={styles.Thing} data={resumeItems.references} renderItem={({ item }) => (
                        <ReferencesDisplay {...item} onEdit={() => navigation.navigate("editreferencesview", item)} deleteItem={(id) => deleteItem("references", id)}/>
                    )}/>
                </View>
                <Pressable style={styles.AddButton} onPress={() => navigate("createreferencesview")}>
                    <Text style={styles.ButtonText}>Add Item</Text>
                </Pressable>
            </View>)
        } else if (menu == "skills") {
            return (<View style={styles.menuContent}>
                <Text style={styles.sectionHeader}>Skills</Text>
                <View style={styles.MainFlatList}>
                    <FlatList style={styles.Thing} data={resumeItems.skills} renderItem={({ item }) => (
                        <SkillsDisplay {...item} onEdit={() => navigation.navigate("editskillsview", item)} deleteItem={(id) => deleteItem("skills", id)}/>
                    )}/>
                </View>
                <Pressable style={styles.AddButton} onPress={() => navigate("createskillsview")}>
                    <Text style={styles.ButtonText}>Add Item</Text>
                </Pressable>
            </View>)
        }

    }

    // 
    return (<View style={styles.background}>
        <View style={styles.section}>
            <Pressable style={styles.MenuButton} onPress={() => setSelectedMenu("workHistory")}>
                <Text style={styles.ButtonText}>Work History</Text>
            </Pressable>
            <Pressable style={styles.MenuButton} onPress={() => setSelectedMenu("education")}>
                <Text style={styles.ButtonText}>Education</Text>
            </Pressable>
            <Pressable style={styles.MenuButton} onPress={() => setSelectedMenu("awards")}>
                <Text style={styles.ButtonText}>Awards</Text>
            </Pressable>
            <Pressable style={styles.MenuButton} onPress={() => setSelectedMenu("references")}>
                <Text style={styles.ButtonText}>References</Text>
            </Pressable>
            <Pressable style={styles.MenuButton} onPress={() => setSelectedMenu("skills")}>
                <Text style={styles.ButtonText}>Skills</Text>
            </Pressable>
        </View>
        
        <View style={styles.mainSection}>
                {changeMenu(selectedMenu)}
        </View>
    </View>)
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: '#0b0e17',
        flexDirection: 'row',
        display: 'flex',
    },
    section: {
        width: '15%',
        height: '30%',
        backgroundColor: '#1e1d2a',
        marginLeft: '10%',
        borderRadius: 0,
        outlineColor: '#ffffff',
        outlineStyle: 'solid',
        outlineWidth: 3
    },
    mainSection: {
        width: '45%',
        height: '100%',
        backgroundColor: '#15182a',
        marginLeft: '',
        borderRadius: 0,
        outlineColor: '#ffffff',
        outlineStyle: 'solid',
        outlineWidth: 3
    },
    menuContent: {
        width: '100%',
        height: '100%',
    },
    sectionHeader: {
        textAlign: 'center',
        width: '100%',
        height: '5%',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: 10,
        marginBottom: '5%'
    },
    AddButton: {
        backgroundColor: '#293155',
        width: '25%',
        height: '5%',
        marginHorizontal: 'auto',
        marginBottom: '5%',
        borderRadius: 0
    },
    MenuButton: {
        backgroundColor: '#293155',
        width: '100%',
        height: '18%',
        marginVertical: '1%',
        marginHorizontal: 'auto',
        borderRadius: 0
    },
    ButtonText: {
        textAlign: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        fontSize: 15,
        color: 'white'
    },
    MainFlatList: {
        width: '95%',
        height: '65%',
        borderWidth: 3,
        borderColor: '#0f111e',
        margin: 'auto',
        backgroundColor: '#181d32'
    },
    Thing: {
        width: '100%',
        height: '100%'
    }
})