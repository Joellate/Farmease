import './CropCard.css';

export default function CropCard({ crop }) {
  if (!crop) return null;

  const {
    id,
    title,
    description,
    quantity,
    location,
    price,
    farmer_name,
    farmer_phone,
    farmer_email,
    created_at,
    farmer_id,
  } = crop;

  const formattedPrice =
    price != null ? new Intl.NumberFormat('rw-RW').format(price) + ' RWF' : 'Contact for price';

  const dateLabel = created_at
    ? new Date(created_at).toLocaleDateString()
    : null;

  return (
    <article className="card crop-card">
      <div className="card-header">
        <h3 className="card-title">{title || 'Crop listing'}</h3>
        {dateLabel && <span className="card-badge">Listed {dateLabel}</span>}
      </div>

      {description && <p className="card-text">{description}</p>}

      <dl className="card-meta">
        {quantity && (
          <div>
            <dt>Quantity</dt>
            <dd>{quantity}</dd>
          </div>
        )}
        {location && (
          <div>
            <dt>Location</dt>
            <dd>{location}</dd>
          </div>
        )}
        <div>
          <dt>Price</dt>
          <dd>{formattedPrice}</dd>
        </div>
      </dl>

      <div className="card-footer">
        <div className="farmer-info">
          <span className="farmer-avatar">{(farmer_name || 'Farmer').charAt(0)}</span>
          <div>
            <p className="farmer-name">{farmer_name || 'Farmer'}</p>
            {(farmer_phone || farmer_email) && (
              <p className="farmer-contact">
                {farmer_phone && <span>{farmer_phone}</span>}
                {farmer_phone && farmer_email && ' · '}
                {farmer_email && <span>{farmer_email}</span>}
              </p>
            )}
          </div>
        </div>

        {/* Display contact details as plain text only (no clickable links) */}
        <div className="farmer-contact-plain">
          {farmer_phone && <div className="farmer-phone">📞 {farmer_phone}</div>}
          {!farmer_phone && farmer_email && <div className="farmer-email">✉️ {farmer_email}</div>}
          {!farmer_phone && !farmer_email && <div className="farmer-no-contact">Contact information not provided</div>}
        </div>

      </div>
    </article>
  );
}

