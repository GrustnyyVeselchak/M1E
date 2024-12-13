import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Button } from "react-native";
import styles from "./styles";
import axios from "axios";

export default function Index() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const rooms = ["420", "421", "425", "431"]; // Аудитории

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получаем данные для всех аудиторий
        const allData = await Promise.all(
          rooms.map((room) =>
            axios
              .get(`https://raspi.ulspu.ru/json/dashboard/events?mode=room&value=${encodeURIComponent(room + "тп/Гл")}`)
              .then((response) => ({
                room,
                events: response.data.data,
              }))
          )
        );

        setData(allData);
        filterThisWeek(allData); // Изначально фильтруем на неделю
      } catch (err) {
        console.error("Не удалось получить расписание с сервера", err);
      }
    };

    fetchData();
  }, []);

  // Фильтрация на текущую неделю
  const filterThisWeek = (allData) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Начало недели (понедельник)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Конец недели (воскресенье)

    const filtered = allData.map(({ room, events }) => ({
      room,
      events: events.filter((item) => {
        const eventDate = new Date(item.start);
        return eventDate >= startOfWeek && eventDate <= endOfWeek;
      }),
    }));

    setFilteredData(filtered);
  };

  // Фильтрация на сегодняшний день
  const filterToday = () => {
    const today = new Date().toISOString().split("T")[0]; // Текущая дата в формате YYYY-MM-DD
    const filtered = data.map(({ room, events }) => ({
      room,
      events: events.filter((item) => {
        const eventDate = new Date(item.start).toISOString().split("T")[0];
        return eventDate === today;
      }),
    }));

    setFilteredData(filtered);
  };

  return (
    <View style={styles.container}>
      {/* Кнопки для фильтрации */}
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        <Button title="Сегодня" onPress={filterToday} />
        <Button title="На неделю" onPress={() => filterThisWeek(data)} />
      </View>

      <ScrollView>
        {filteredData.map(({ room, events }) => (
          <View key={room} style={styles.roomContainer}>
            <Text style={styles.roomTitle}>Аудитория {room}</Text>
            {events.length > 0 ? (
              events.map((item, index) => {
                const startDate = new Date(item.start).toLocaleString();
                const endDate = new Date(item.end).toLocaleString();

                return (
                  <View key={index} style={styles.lessContainer}>
                    <Text style={styles.text}>{item.title}</Text>
                    <Text style={styles.text}>Начало: {startDate}</Text>
                    <Text style={styles.text}>Конец: {endDate}</Text>
                  </View>
                );
              })
            ) : (
              <Text style={styles.text}>Нет занятий</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
