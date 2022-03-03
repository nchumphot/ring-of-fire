import { useEffect, useState } from "react";
import { ICard } from "../interfaces/ICard";

export function AddARule(props: {
  card: ICard;
  setRules: React.Dispatch<React.SetStateAction<string[]>>;
  setTurnCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [typedRule, setTypedRule] = useState<string>("");
  const [ruleAdded, setRuleAdded] = useState<boolean>(false);
  useEffect(() => setRuleAdded(false), [props.card]);
  if (ruleAdded === false) {
    return (
      <form>
        <label htmlFor="rule">Add a rule</label>
        <input
          name="rule"
          type="text"
          placeholder="Type your rule here..."
          value={typedRule}
          onChange={(e) => setTypedRule(e.target.value)}
        ></input>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            props.setRules((prev) => [...prev, typedRule]);
            setRuleAdded(true);
            props.setTurnCompleted(true);
            setTypedRule("");
          }}
        >
          Add rule
        </button>
      </form>
    );
  } else {
    return <p className="text-danger">{`New rule: ${typedRule}`}</p>;
  }
}
