/**
 * Inspiration: https://blog.hackages.io/conditionally-wrap-an-element-in-react-a8b9a47fab2
 *
 * Example where a tooltip is conditionally wrapped around a component based on condition:
 * 
 * <ConditionalWrapper
    condition={condition}
    wrapper={(children) => (
      <Tooltip placement="right" arrow title={"some title"}>
        {children}
      </Tooltip>
    )}
  >
      <MyCoolComponent>
  </ConditionalWrapper>
 * 
 * @param {{
 *  condition: boolean
 *  wrapper: JSX.Element | HTML.Element
 *  children: JSX.Element
 *  }} props
 * @returns {JSX.Element}
 */
const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

export default ConditionalWrapper;
