export default function PostcodeForm({ onSearch }) {
  const [postcode, setPostcode] = React.useState("");
  return (
    <div className="form-group">
      <label>Enter a postcode</label>
      <p className="example-text">For example SW1A 2AA</p>
      <form className="input-row" onSubmit={(e) => { e.preventDefault(); onSearch(postcode); }}>
        <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} placeholder="N21 3PY" />
        <button className="btn-search" type="submit">Search</button>
      </form>
    </div>
  );
}