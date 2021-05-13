import React, { useState } from "react";
import { graphql, QueryRenderer } from "react-relay";
import { Link, RouteComponentProps } from "react-router-dom";

import Loader from "../common/components/Loader";
import environment from "../common/graphqlEnvironment";
import DebouncedInput from "./components/DebouncedInput";
import { SongSearchQuery } from "./__generated__/SongSearchQuery.graphql";

interface SongSearchParams {
  query: string | undefined;
}

interface Props extends RouteComponentProps<SongSearchParams> {}

function SongSearch(outerProps: Props) {
  const [songName, setSongName] = useState<string | null>(
    outerProps.match.params.query || null
  );

  return (
    <div>
      <h5>Searching by song title</h5>
      <DebouncedInput
        period={500}
        onChange={(e) => {
          setSongName(e.target.value === "" ? null : e.target.value);
          history.replaceState({}, "", `#/search/song/${e.target.value}`);
        }}
        defaultValue={outerProps.match.params.query}
      />
      <QueryRenderer<SongSearchQuery>
        environment={environment}
        query={graphql`
          query SongSearchQuery($name: String) {
            songsByName(name: $name) {
              id
              name
              artistName
            }
          }
        `}
        variables={{
          name: songName,
        }}
        render={({ error, props }) => {
          if (songName === null) {
            return;
          }
          if (!props) {
            return <Loader />;
          }
          return (
            <div className="collection">
              {props.songsByName.map((song) => (
                <Link
                  to={`/song/${song.id}`}
                  className="collection-item"
                  key={song.id}
                >
                  {song.name}
                  <br />
                  {song.artistName}
                </Link>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
}
export default SongSearch;
