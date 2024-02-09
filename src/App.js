import "./App.css";
import {
  Container,
  SimpleGrid,
  List,
  ThemeIcon,
  rem,
  Input,
  Button,
  Flex,
  Drawer,
} from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import CardComponent from "./components/Card";
import { useState } from "react";

const storeItems = [
  {
    name: "Oyuncak Araba",
    src: "araba",
    price: 20,
  },
  {
    name: "Ayakkabı",
    src: "ayakkabı",
    price: 10,
  },
  {
    name: "Kamera",
    src: "camera",
    price: 25,
  },
  {
    name: "Klasik Saat",
    src: "saat",
    price: 25,
  },
];

function App() {
  let [opened, setOpened] = useState(false);
  let [basketItems, setBasketItems] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let filteredItems = storeItems.filter(
    (item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
  );
  return (
    <Container>
      <Flex align="flex-end" gap="sm" justify="center">
        <Input.Wrapper label="Arama">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Input.Wrapper>
        <Button onClick={() => setSearchValue("")}>Temizle</Button>
        <Button onClick={() => setOpened(true)}>Sepet</Button>
      </Flex>
      <SimpleGrid cols={3} className="simple">
        {filteredItems.map(({ name, price, src }, index) => {
          return (
            <CardComponent
              name={name}
              src={src}
              price={price}
              key={index}
              onAdd={() => setBasketItems([...basketItems, { name }])}
            />
          );
        })}
      </SimpleGrid>
      <Drawer opened={opened} onClose={() => setOpened(false)} title="Sepetim">
        <List
          className="list"
          spacing="md"
          size="md"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
            </ThemeIcon>
          }
        >
          {basketItems.map(({ name }, index) => (
            <List.Item key={index}>{name}</List.Item>
          ))}
        </List>
      </Drawer>
    </Container>
  );
}

export default App;
