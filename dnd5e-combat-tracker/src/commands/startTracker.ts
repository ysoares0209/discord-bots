import { InteractionResponseType } from "discord-interactions";

const startTracker = () => {
  const actionRowType = 1;
  const textInputType = 4;
  const singleParagraphTextInputType = 1;
  return {
    type: InteractionResponseType.APPLICATION_MODAL,
    data: {
      title: "Create new tracker",
      custom_id: "new-tracker",
      components: [
        {
          type: actionRowType,
          components: [
            {
              type: textInputType,
              custom_id: "tracker-name",
              label: "Your encounter name",
              style: singleParagraphTextInputType,
              required: true,
              placeholder: "You can use the name to find this tracker later!",
            },
          ],
        },
      ],
    },
  };
};

export default startTracker;
