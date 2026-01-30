import { createSlice } from "@reduxjs/toolkit";
import image1 from "../../../public/assets/images/testimonial/testimonial-1.webp";
import image2 from "../../../public/assets/images/testimonial/testimonial-2.webp";
import image3 from "../../../public/assets/images/testimonial/testimonial-3.webp";
import image4 from "../../../public/assets/images/testimonial/testimonial-3.webp";
import image5 from "../../../public/assets/images/testimonial/testimonial-5.webp";
import image6 from "../../../public/assets/images/testimonial/testimonial-6.webp";
const initialState = {
  testmonials: [
    {
      id: 1,
      image: image1,
      name: "Sarah Thompson",
      country: "New York, USA",
      desc: "StyleLoom exceeded my expectations. The gown's quality and design made me feel like a queen. Fast shipping, too! ",
    },
    {
      id: 2,
      image: image2,
      name: "Rajesh Patel",
      country: "Mumbai, India",
      desc: "Absolutely love the style and warmth of the jacket. A perfect blend of fashion and functionality!",
    },
    {
      id: 3,
      image: image3,
      name: "Emily Walker",
      country: "London, UK",
      desc: "Adorable and comfortable! My daughter loves her new outfit. Thank you, StyleLoom, for dressing our little fashionista.",
    },
    {
      id: 4,
      image: image4,
      name: "Alejandro Martinez",
      country: "Barcelona, Spain",
      desc: "Impressed by the quality and style. These shoes turned heads at every event. StyleLoom, you've gained a loyal customer!",
    },
    {
      id: 5,
      image: image5,
      name: "Priya Sharma",
      country: "Delhi, India",
      desc: "Perfect fit and exceptional quality. These jeans have become my go-to for casual and chic outings.",
    },
    {
      id: 6,
      image: image6,
      name: "Rodriguez",
      country: "Mexico City, Mexico",
      desc: "Stylish sneakers that don't compromise on comfort. StyleLoom knows how to balance fashion and functionality.",
    },
  ],
};
const testmonialsSlice = createSlice({
  name: "testmonials",
  initialState,
  reducers: {},
});

export default testmonialsSlice.reducer;
