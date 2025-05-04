import { defaultStringValidation } from "@/utilities/constants";
import { object, string, type InferType } from "yup";

export const assetSchema = object({
  email: string().email("Invalid email").required("Required"),
  password: defaultStringValidation(8),
  name: defaultStringValidation(),
  phone: defaultStringValidation(),
  address: defaultStringValidation(),
  packet_internet: defaultStringValidation(),
});

export type AssetSchema = InferType<typeof assetSchema>;

export const asset = {
  type: "",
  brand: "",
  model: "",
  serial_number: "",
  mac_address: "",
  date: "",
  site: "",
  quantity: "",
  status: "",
  price: "",
  description: "",
  status_in_out: "",
};

export const status_in_out = [
  { label: "IN", value: "in" },
  { label: "OUT", value: "out" },
];

export const status = [
  { label: "Broken", value: "broken" },
  { label: "Good", value: "good" },
  { label: "Bad", value: "bad" },
];

export const defaultAssets  =[{
    id: 1,
    type: 'Laptop',
    brand: 'Asus',
    model: 'ROG Strix G15',
    serial_number: '1234567890',
    mac_address: '00:1A:2B:3C:4D:5E',
    date: '2023-01-01',
    area: 'Office',
    description: 'Gaming laptop'
}, {
    id: 2,
    type: 'Monitor',
    brand: 'Dell',
    model: 'UltraSharp U2720Q',
    serial_number: '0987654321',
    mac_address: '11:22:33:44:55:66',
    date: '2023-02-01',
    area: 'Office',
    description: '4K monitor'
}]
