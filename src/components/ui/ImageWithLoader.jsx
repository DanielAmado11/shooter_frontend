import { useState } from "react";
import styles from "./ImageWithLoader.module.css";

const ImageWithLoader = ({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  aspectRatio,
  objectFit = "cover",
  eager = false,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {!loaded && !failed && <div className={styles.skeleton} />}
      {failed && (
        <div className={styles.fallback}>
          <span>No preview</span>
        </div>
      )}
      {!failed && (
        <img
          src={src}
          alt={alt}
          className={[
            styles.image,
            loaded && styles.imageLoaded,
            imgClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ objectFit }}
          loading={eager ? "eager" : "lazy"}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
};

export default ImageWithLoader;
