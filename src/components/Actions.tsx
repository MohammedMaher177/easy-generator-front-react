import Tippy from "@tippyjs/react";
import IconPencil from "./Icon/IconPencil";
import IconTrashLines from "./Icon/IconTrashLines";

type ActionsType = "Edit" | "Delete";

type Props = {
  actions: ActionsType[];
  onDelete?: () => void;
  onEdit?: () => void;
};

export default function Actions({ actions, onDelete, onEdit }: Props) {
  return (
    <div className="flex gap-4 ">
      {actions.map((action) => {
        return action === "Edit" ? (
          <Tippy key={action} content={"Edit"}>
            <button type="button" onClick={onEdit}>
              <IconPencil className="ltr:mr-2 rtl:ml-2 transition-transform transform hover:scale-150" />
            </button>
          </Tippy>
        ) : action === "Delete" ? (
          <Tippy key={action} content={"Delete"}>
            <button type="button" onClick={onDelete}>
              <IconTrashLines className="ltr:mr-2 rtl:ml-2 transition-transform transform hover:scale-150" />
            </button>
          </Tippy>
        ) : (
          <></>
        );
      })}
      <></>
    </div>
  );
}
