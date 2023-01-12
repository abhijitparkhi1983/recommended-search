export type SearchInputPropsType = {
  //   value?: OptionType;
  options: OptionType[];
  placeholder?: string;
  onSearch: (query: string) => void;
};

export type OptionType = {
  label: string;
  value: string;
};
