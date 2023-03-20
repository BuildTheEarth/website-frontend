import { Center, LoadingOverlay } from "@mantine/core";

function MapLoader() {
  return (
    <Center
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 99,
      }}
    >
          <LoadingOverlay visible={true} />
    </Center>
  );
}

export default MapLoader;
