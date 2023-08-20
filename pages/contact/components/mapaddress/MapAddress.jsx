const MapAddress = () => {
  return (
    <div style={{ marginTop: "1.2rem" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6855.078879902208!2d30.999176912689222!3d30.787503254357244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1683414761942!5m2!1sar!2seg"
        style={{ width: "100%", height: "450px", border: "0px" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapAddress;
