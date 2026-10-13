type Props = {
  readonly variable: string;
  readonly subscript?: string;
};

export function CustomVariable({ variable, subscript }: Props) {
  return (
    <em>
      {variable}
      {subscript && (
        <span style={{ verticalAlign: 'sub', fontSize: 12 }}>{subscript}</span>
      )}
    </em>
  );
}
