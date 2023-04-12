import actions from "./actions.json";
import styles from "../styles/Home.module.css";
import ActionsSelector from "@/components/ActionsSelector";

const Actions = ({
  actions,
  titleActions,
}: {
  actions: Record<
    string,
    {
      readActions: string[];
      writeActions: string[];
      listActions: never[];
      prefix: string;
      arn_format: string;
      arn_regex: string;
      name: string;
    }
  >;
  titleActions: string[];
}) => {
  return (
    <>
      <ActionsSelector actionsTitles={titleActions} />
    </>
  );
};

export async function getStaticProps() {
  const titleActions = Object.values(actions).map((ac) => ac.name);
  return {
    props: {
      actions,
      titleActions,
    },
  };
}

export default Actions;
