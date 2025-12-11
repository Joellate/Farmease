import { useState } from 'react';
import api from '../api/client';

export default function CropForm({ onCreated }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    quantity: '',
    location: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const payload = {
        ...form,
        price: form.price ? Number(form.price) : null,
      };

      const res = await api.post('/crops', payload);

      setSuccess('Crop saved successfully.');
      setForm({
        title: '',
        description: '',
        quantity: '',
        location: '',
        price: '',
      });

      if (onCreated) onCreated(res.data);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Could not save crop.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <div className="form-group">
        <label className="form-label" htmlFor="title">
          Crop name / title
        </label>
        <input
          id="title"
          name="title"
          className="form-input"
          placeholder="e.g. Fresh Irish potatoes"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="description">
          Short description
        </label>
        <textarea
          id="description"
          name="description"
          className="form-input"
          style={{ minHeight: '70px', resize: 'vertical' }}
          placeholder="Quality, variety, harvest date..."
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="quantity">
          Quantity (e.g. 5 sacks)
        </label>
        <input
          id="quantity"
          name="quantity"
          className="form-input"
          placeholder="e.g. 20 sacks"
          value={form.quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="location">
          Location
        </label>
        <input
          id="location"
          name="location"
          className="form-input"
          placeholder="e.g. Musanze"
          value={form.location}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="price">
          Price (optional, RWF)
        </label>
        <input
          id="price"
          name="price"
          type="number"
          className="form-input"
          placeholder="e.g. 150000"
          value={form.price}
          onChange={handleChange}
          min="0"
        />
      </div>

      {error && <p className="text-error">{error}</p>}
      {success && <p className="text-success">{success}</p>}

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Saving crop…' : 'Save crop'}
      </button>
    </form>
  );
}
