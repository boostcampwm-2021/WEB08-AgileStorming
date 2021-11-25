interface IProps {
  color: string;
}

const ColorIcon: React.FC<IProps> = ({ color }) => {
  return (
    <svg height='16' width='16'>
      <circle cx='6' cy='8' r='6' strokeWidth='3' fill={`#${color}`} />
    </svg>
  );
};

export default ColorIcon;
