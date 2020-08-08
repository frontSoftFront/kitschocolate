export const logo = ({ w, h, color }) => (
  <svg
    fill="none"
    width={w || 62}
    height={h || 81}
    viewBox="0 0 62 81"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill={color || '#62554A'}
      d="M22.119 67.974c-.382-.378-.551-.84-.551-1.387 0-.546.19-1.009.55-1.387.382-.378.848-.567 1.398-.567.72 0 1.356.378 1.652.945l-.826.484c-.148-.294-.466-.484-.847-.484-.572 0-.995.42-.995 1.009 0 .294.106.525.275.715.19.189.424.273.72.273.381 0 .7-.19.847-.484l.826.463c-.317.588-.953.966-1.673.966-.53.021-.995-.168-1.377-.546zM29.426 65.054c.275.273.402.63.402 1.113v2.249h-.953v-2.144c0-.483-.296-.756-.741-.756-.487 0-.826.294-.826.904v1.996h-.953v-5.148h.953v1.89c.233-.335.593-.525 1.101-.525.424.022.763.148 1.017.42zM33.172 68.542c-.55 0-1.016-.19-1.397-.568-.382-.378-.572-.84-.572-1.386 0-.547.19-1.01.572-1.366.38-.379.847-.568 1.397-.568.551 0 1.017.19 1.398.568.381.378.572.84.572 1.366 0 .525-.19 1.008-.572 1.386-.381.379-.847.568-1.398.568zm0-.946c.297 0 .53-.105.72-.294.191-.19.297-.441.297-.736 0-.294-.106-.546-.297-.735-.19-.19-.423-.294-.72-.294-.296 0-.53.105-.72.294-.19.19-.275.441-.275.736 0 .294.106.546.275.735.19.21.445.294.72.294zM43 68.542c-.551 0-1.017-.19-1.398-.568-.382-.378-.572-.84-.572-1.386 0-.547.19-1.01.572-1.366.38-.379.847-.568 1.397-.568.551 0 1.017.19 1.398.568.382.378.572.84.572 1.366 0 .525-.19 1.008-.572 1.386-.38.379-.847.568-1.398.568zm0-.946c.296 0 .529-.105.72-.294.19-.19.296-.441.296-.736 0-.294-.106-.546-.297-.735-.19-.19-.423-.294-.72-.294-.296 0-.529.105-.72.294-.19.19-.275.441-.275.736 0 .294.106.546.275.735.191.21.424.294.72.294zM46.434 68.436v-5.379h.953v5.38h-.953zM51.453 64.76h.953v3.677h-.953v-.442c-.296.358-.699.547-1.207.547-.487 0-.91-.19-1.27-.568-.34-.378-.53-.84-.53-1.386 0-.547.17-1.01.53-1.366.36-.379.783-.568 1.27-.568.53 0 .91.168 1.207.547v-.442zm-1.038 2.857c.297 0 .551-.105.742-.294.19-.19.296-.441.296-.756 0-.316-.106-.547-.296-.736-.19-.19-.445-.294-.741-.294-.297 0-.551.105-.742.294-.19.19-.296.441-.296.736 0 .294.106.546.296.756.19.21.445.294.742.294zM56.385 65.663h-.847v1.534c0 .399.296.399.847.378v.861c-1.313.148-1.8-.23-1.8-1.24v-1.533h-.636v-.904h.636v-.756l.953-.294v1.03h.847v.924zM58.758 66.986c.127.463.466.694 1.038.694.36 0 .635-.126.826-.379l.763.442c-.36.525-.911.777-1.61.777-.614 0-1.101-.189-1.483-.546-.38-.357-.55-.84-.55-1.387 0-.546.19-1.009.55-1.387.36-.378.847-.567 1.42-.567.55 0 .995.189 1.334.567.36.378.53.84.53 1.387 0 .126-.022.252-.043.4h-2.775zm1.885-.735c-.106-.505-.487-.736-.91-.736-.509 0-.869.273-.975.736h1.885zM36.799 67.974c-.382-.378-.551-.84-.551-1.387 0-.546.19-1.009.55-1.387.382-.378.848-.567 1.398-.567.72 0 1.356.378 1.653.945l-.826.484c-.149-.294-.466-.484-.848-.484-.572 0-.995.42-.995 1.009 0 .294.106.525.275.715.19.189.424.273.72.273.382 0 .7-.19.848-.484l.825.463c-.317.588-.953.966-1.673.966-.53.021-.995-.168-1.376-.546zM48.953 33.996c.211-.084.338-.273.36-.504 0-.232-.106-.42-.318-.505-.72-.336-1.716-.105-2.436.168l-5.824 2.123 6.354-21.119c.084-.294.254-1.008-.043-1.47-.127-.21-.338-.337-.571-.358-.509-.084-.996.252-1.144.757l-5.337 18.45c-.742 2.584-1.589 5-3.643 6.22-.487.293-1.038.546-1.588.777-1.335.588-2.711 1.198-2.923 2.416-.021.105 0 .252 0 .441 0 .169.021.526-.021.61-.191.231-.53.126-.996-.063-.212-.084-.402-.147-.593-.19-1.038-.146-1.864.757-2.393 1.45-3.643 4.729-6.375 10.234-7.963 15.992-2.267-3.131-6.121-5.128-9.997-5.128.296-2.059.657-4.265 1.27-6.409.467-1.639 1.356-2.752 2.733-4.097 1.25-1.24 2.563-2.585 3.96-4.119 1.991-2.164 3.94-4.434 5.846-6.64.53-.63 1.08-1.24 1.61-1.87l5.485-6.325c.402-.483.762-1.198.656-1.744-.063-.273-.254-.484-.53-.61-.465-.189-1.016-.063-1.333.358l-7.921 9.54c-3.135 3.782-6.375 7.67-9.785 11.305 1.61-14.247 3.6-28.641 5.93-42.804.064-.336-.17-.567-.424-.63-.254-.064-.571.041-.677.357-.593 1.723-.953 3.488-1.271 5.316-2.16 11.789-3.495 23.724-4.702 34.924-.17 1.64-.36 3.32-1.101 4.812-.763 1.534-1.991 2.837-3.177 4.098-.36.378-.72.756-1.059 1.134-1.694 1.892-3.41 3.804-5.083 5.716-.254.294-.36.651-.275.988.042.252.19.44.402.546.72.357 2.16-.336 3.092-.777.233-.106.445-.21.572-.253.085-.02.318-.105.636-.21 1.588-.525 2.435-.84 2.88-1.05l-.381 1.89c-.34 1.766-.678 3.447-1.208 5.107L3.63 70.202C.685 79.51.855 79.784.92 79.889c.042.042.105.105.147.105.043 0 .106.02.149.02.508 0 .932-.44 1.25-1.239 2.054-5.674 3.833-11.305 5.294-16.748.339-1.281.678-2.584.996-3.887.042-.168.084-.378.127-.567.169-.799.338-1.723.974-2.123.423-.273 1.016-.252 1.461-.189 3.198.378 6.1 2.375 7.582 5.212.212.399.869 1.66 1.864 1.155.36-.189.614-.567.635-1.008.445-6.115 3.198-12.02 7.604-16.349l-3.537 10.213c-.085.252-.276.903-.043 1.366.106.189.276.336.488.399.402.126.847-.063 1.08-.42 1.313-1.997 1.927-4.308 2.541-6.535.34-1.261.678-2.543 1.144-3.762 1.101-2.879 3.58-6.199 7.01-6.283L32.56 56.04c-.021.084.021.189.085.23.254.148.53.169.804.064.572-.231.996-.946 1.186-1.576l3.728-12.755c.381-1.282.762-2.606 1.567-3.677 1.44-1.934 3.791-2.627 6.27-3.363.931-.357 1.863-.63 2.753-.966zM9.369 47.928c-.149 1.092-.763 3.845-1.165 5.421-.042.147-.064.252-.085.336 0 .042-.021.084-.021.105-.021 0-.042.021-.064.021-.084.021-.233.084-.444.169-1.8.819-4.68 1.933-5.104 1.89-.022-.02-.022-.041-.022-.041-.02-.19.212-.63 1.44-1.807.763-.736 4.321-4.791 5.465-6.094zM59.837 40.972c-.614-.63-1.25-1.261-1.567-2.038-.403-.967.275-1.87 1.059-2.795.296-.358.635-.505 1.016-.673.233-.105.466-.21.72-.378.466-.294.742-1.009.593-1.492-.106-.336-.402-.546-.826-.546h-.02c-.996 0-1.801.84-2.458 1.534-.063.084-.148.147-.211.21-.657.672-1.462 1.576-1.843 2.732-.508 1.513.572 2.731 1.419 3.719.085.105.17.21.254.294.148.168.297.336.487.526.55.588 1.186 1.24 1.271 1.89.106.715-.212 1.388-.53 1.934-1.44 2.5-3.43 4.455-6.269 6.157-.783.462-1.61.924-2.414 1.366-.572.315-1.186.651-1.779.987-.042.021-4.511 2.606-4.553 3.236 0 .084.02.168.105.231.106.084.212.105.318.105.085 0 .17-.02.254-.041 2.076-.526 4.173-1.64 6.015-2.627l.127-.063c2.351-1.261 4.448-2.669 6.206-4.16 1.44-1.24 3.07-2.648 3.897-4.603.339-.82.677-1.786.508-2.731-.19-1.156-.995-1.976-1.78-2.774zM48.638 39.5c-.212.715-.233 1.178-.064 1.472.085.126.212.21.36.21h.022c.423 0 .91-.63.974-.715.572-.777 1.016-1.639 1.461-2.458.572-1.093 1.165-2.206 2.033-3.131l.106-.105c.254-.273.551-.568.297-1.093-.17-.315-.614-.567-.974-.567-.72 0-1.356.945-1.758 1.555-.064.084-.106.147-.149.21-.571.84-1.08 1.723-1.482 2.669-.042.084-.085.168-.127.294-.212.399-.509 1.05-.7 1.66z"
    />
  </svg>
);

export const youTube = ({ w, h, color }) => (
  <svg
    fill="none"
    width={w || 42}
    height={h || 30}
    viewBox="0 0 42 30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill={color || '#E5E5E5'}
      d="M33.277 0H8.723C3.905 0 0 3.942 0 8.805v12.39C0 26.058 3.905 30 8.723 30h24.554C38.095 30 42 26.058 42 21.195V8.805C42 3.942 38.095 0 33.277 0zm-5.9 15.603l-11.484 5.529c-.306.147-.66-.078-.66-.42V9.308c0-.347.363-.572.67-.415l11.485 5.875c.341.174.335.669-.01.835z"
    />
  </svg>
);

export const facebook = ({ w, h, color }) => (
  <svg
    fill="none"
    width={w || 15}
    height={h || 30}
    viewBox="0 0 15 30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill={color || '#E5E5E5'}
      d="M15 10.5H9.976v-3c0-1.548.12-2.523 2.228-2.523h2.662V.207C13.57.067 12.268-.003 10.964 0 7.097 0 4.276 2.486 4.276 7.05V10.5H0v6l4.276-.002V30h5.7V16.495l4.37-.001L15 10.5z"
    />
  </svg>
);

export const instagram = ({ w, h, color }) => (
  <svg
    fill="none"
    width={w || 30}
    height={h || 30}
    viewBox="0 0 30 30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill={color || '#E5E5E5'}
      d="M17.636 15c0 1.456-1.18 2.637-2.637 2.637-1.456 0-2.637-1.18-2.637-2.637 0-1.456 1.18-2.637 2.637-2.637 1.456 0 2.637 1.18 2.637 2.637z"
    />
    <path
      fill={color || '#E5E5E5'}
      d="M19.453 7.031h-8.906c-1.939 0-3.516 1.577-3.516 3.516v8.906c0 1.939 1.577 3.516 3.516 3.516h8.906c1.939 0 3.516-1.577 3.516-3.516v-8.906c0-1.939-1.577-3.516-3.516-3.516zM15 19.395c-2.423 0-4.395-1.972-4.395-4.395 0-2.423 1.972-4.395 4.395-4.395 2.423 0 4.395 1.972 4.395 4.395 0 2.423-1.972 4.395-4.395 4.395zm5.04-8.555c-.486 0-.88-.394-.88-.88 0-.485.394-.878.88-.878.485 0 .878.393.878.879 0 .485-.393.879-.879.879z"
    />
    <path
      fill={color || '#E5E5E5'}
      d="M22.09 0H7.91C3.55 0 0 3.549 0 7.91v14.18C0 26.45 3.549 30 7.91 30h14.18C26.45 30 30 26.451 30 22.09V7.91C30 3.55 26.451 0 22.09 0zm2.637 19.453c0 2.908-2.366 5.274-5.274 5.274h-8.906c-2.908 0-5.274-2.366-5.274-5.274v-8.906c0-2.908 2.366-5.274 5.274-5.274h8.906c2.908 0 5.274 2.366 5.274 5.274v8.906z"
    />
  </svg>
);

export const ln = ({ w, h, color }) => (
  <svg
    fill="none"
    width={w || 30}
    height={h || 30}
    viewBox="0 0 30 30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill={color || '#E5E5E5'}
      d="M3.913 0C1.65 0 .006 1.451.006 3.447c0 2.003 1.683 3.518 3.907 3.518 2.263 0 3.907-1.48 3.907-3.559C7.715 1.403 6.104 0 3.913 0zM.653 8.367c-.36 0-.653.314-.653.698v20.237c0 .384.293.698.652.698h6.522c.359 0 .652-.314.652-.698V9.065c0-.384-.293-.698-.652-.698H.652zm9.13.698c0-.384.293-.698.652-.698h6.521c.36 0 .653.314.653.698v1.04c1.05-.789 2.784-1.738 5.08-1.738 5.047 0 7.311 4.557 7.311 9.072v11.863c0 .384-.294.698-.652.698h-5.87c-.36 0-.652-.313-.652-.698V18.486c0-1.654-1.187-3.001-2.7-3.127-.077-.014-.153-.014-.23-.014h-.01c-.076 0-.153 0-.23.014-1.512.126-2.7 1.473-2.7 3.127v10.816c0 .385-.292.698-.652.698h-5.87c-.358 0-.651-.314-.651-.698V9.065z"
    />
  </svg>
);

export const basket = ({ w, h, color }) => (
  <svg
    fill="none"
    width={w || 21}
    height={h || 24}
    viewBox="0 0 21 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill={color || '#646464'}
      d="M19.616 22.517c-.278.312-.657.483-1.067.483H2.45c-.41 0-.79-.171-1.066-.483-.288-.323-.424-.758-.374-1.193L2.655 7H5v2.154c-.293.174-.5.48-.5.846 0 .553.448 1 1 1 .553 0 1-.447 1-1 0-.366-.206-.672-.5-.846V7h9v2.154c-.293.174-.5.48-.5.846 0 .553.448 1 1 1 .553 0 1-.447 1-1 0-.366-.206-.672-.5-.846V7h2.346l1.644 14.324c.05.435-.086.87-.374 1.193zM6 5.5C6 3.019 8.019 1 10.5 1 12.982 1 15 3.019 15 5.5V6H6v-.5zm14.983 15.709L19.238 6H16v-.5C16 2.468 13.533 0 10.5 0 7.468 0 5 2.468 5 5.5V6H1.763L.017 21.209c-.083.719.144 1.438.62 1.974.465.52 1.125.817 1.814.817h16.098c.689 0 1.35-.297 1.813-.817.478-.536.704-1.255.62-1.974z"
    />
  </svg>
);

export const arrow = ({ w, h, color }) => (
  <svg
    fill="none"
    width={w || 50}
    height={h || 50}
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clipRule="evenodd"
      fillRule="evenodd"
      d="M49 1H1v48h48V1z"
      stroke={color || '#A18071'}
    />
    <path
      fill={color || '#A18071'}
      d="M25 17l1.41 1.41L20.83 24H33v2H20.83l5.58 5.59L25 33l-8-8 8-8z"
    />
  </svg>
);

export const styledArrow = ({ w, h, color }) => (
  <svg
    fill="none"
    width={w || 50}
    height={h || 50}
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0h48v48H0V0z"
      fill={color || '#A18071'}
    />
    <path
      fill="#fff"
      d="M24 16l-1.41 1.41L28.17 23H16v2h12.17l-5.58 5.59L24 32l8-8-8-8z"
    />
  </svg>
);