import CropForm from '../components/CropForm';
import CropFeed from './CropFeed'; 

export default function Dashboard() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            Add your crops and see what’s happening on the marketplace.
          </p>
        </div>
      </div>

      <div className="page-grid">
        <section className="card card-elevated">
          <h2 className="section-title">Add a new crop</h2>
          <CropForm />
        </section>

        <section className="card card-elevated">
          <h2 className="section-title">Latest listings</h2>
          <CropFeed />
        </section>
      </div>
    </div>
  );
}
