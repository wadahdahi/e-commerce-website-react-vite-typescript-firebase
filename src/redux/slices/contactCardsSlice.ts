import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactCard {
  id: number;
  iconBg: string;
  iconMain: string;
  title: string;
  content: string;
}

interface ContactCardsState {
  cards: ContactCard[];
}

const initialState: ContactCardsState = {
  cards: [
    {
      id: 1,
      iconBg: "./assets/icons/contact-info/email/email-bg.svg",
      iconMain: "./assets/icons/contact-info/email/email.svg",
      title: "Email",
      content: "support@StyleLoom.com",
    },
    {
      id: 2,
      iconBg: "./assets/icons/contact-info/phone/phone-bg.svg",
      iconMain: "./assets/icons/contact-info/phone/phone.svg",
      title: "Phone",
      content: "+1 (555) 123-4567",
    },
    {
      id: 3,
      iconBg: "./assets/icons/contact-info/location/location-bg.svg",
      iconMain: "./assets/icons/contact-info/location/location.svg",
      title: "Location",
      content: "Get Direction",
    },
  ],
};

const contactCardsSlice = createSlice({
  name: "contactCards",
  initialState,
  reducers: {
    updateCard(state, action: PayloadAction<ContactCard>) {
      const index = state.cards.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) state.cards[index] = action.payload;
    },
    addCard(state, action: PayloadAction<ContactCard>) {
      state.cards.push(action.payload);
    },
    removeCard(state, action: PayloadAction<number>) {
      state.cards = state.cards.filter((c) => c.id !== action.payload);
    },
  },
});

export const { updateCard, addCard, removeCard } = contactCardsSlice.actions;
export default contactCardsSlice.reducer;
