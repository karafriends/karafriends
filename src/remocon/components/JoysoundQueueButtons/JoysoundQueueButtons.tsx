import React, { useEffect, useState } from "react";

import useNickname from "../../hooks/useNickname";
import { JoysoundSongPageQuery$data } from "../../pages/__generated__/JoysoundSongPageQuery.graphql";
import JoysoundQueueButton from "./JoysoundQueueButton";
import styles from "./JoysoundQueueButtons.module.scss";

interface Props {
  song: JoysoundSongPageQuery$data["joysoundSongDetail"];
  youtubeVideoId: string | null;
}

const JoysoundQueueButtons = ({ song, youtubeVideoId }: Props) => {
  const nickname = useNickname();
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div className={styles.container}>
      <JoysoundQueueButton
        song={song}
        youtubeVideoId={youtubeVideoId}
        nickname={nickname}
        isRomaji={false}
        isDisabled={isDisabled}
        setDisabled={setIsDisabled}
      />

      <JoysoundQueueButton
        song={song}
        youtubeVideoId={youtubeVideoId}
        nickname={nickname}
        isRomaji={true}
        isDisabled={isDisabled}
        setDisabled={setIsDisabled}
      />
    </div>
  );
};

export default JoysoundQueueButtons;
