import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/auth';
import { create, getTags, removeTag } from '../../actions/tag';

const Tag = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, tags, removed, reload } = values;
  const token = getCookie('token');

  useEffect(() => {
    loadTags();
  }, [reload]);

  const loadTags = () => {
    getTags().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, tags: data });
      }
    });
  };

  const showTags = () => {
    return tags.map((t, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(t.slug)}
          title='Nhấp đôi chuột để xoá'
          key={i}
          className='btn btn-outline-primary mr-1 ml-1 mt-3'
        >
          {t.name}
        </button>
      );
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm('Bạn có chắc chắn muốn xoá thẻ này?');
    if (answer) {
      deleteTag(slug);
    }
  };

  const deleteTag = (slug) => {
    // console.log('delete', slug);
    removeTag(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: '',
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    // console.log('create category', name);
    create({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: '',
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: '',
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className='text-success'>Thẻ đã được tạo</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className='text-danger'>Thẻ đã tồn tại</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className='text-danger'>Thẻ đã được xoá</p>;
    }
  };

  const mouseMoveHandler = (e) => {
    setValues({ ...values, error: false, success: false, removed: '' });
  };

  const newTagFom = () => (
    <form onSubmit={clickSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Tên</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange}
          value={name}
          required
        />
      </div>
      <div>
        <button type='submit' className='btn btn-primary'>
          Tạo
        </button>
      </div>
    </form>
  );

  return (
    <React.Fragment>
      {showSuccess()}
      {showError()}
      {showRemoved()}
      <div onMouseMove={mouseMoveHandler}>
        {newTagFom()}
        {showTags()}
      </div>
    </React.Fragment>
  );
};

export default Tag;
